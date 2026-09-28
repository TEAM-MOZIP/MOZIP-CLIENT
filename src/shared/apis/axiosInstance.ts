import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { ENDPOINTS } from '@shared/apis/endpoints';
import { postRefreshToken } from '@shared/apis/refreshTokenApi';
import { useAuthStore } from '@shared/stores/useAuthStore';

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

type QueueItem = {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
};

// 401 에러가 발생해도 토큰 갱신을 시도하지 않을 엔드포인트 (무한 루프 방지)
const SKIP_REFRESH_ENDPOINTS = new Set<string>([
  ENDPOINTS.AUTH.KAKAO_LOGIN,
  ENDPOINTS.AUTH.REFRESH,
  ENDPOINTS.AUTH.LOGOUT,
]);

let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// refresh 완료 후 큐에 대기하던 요청들 일괄 재개 (성공: 토큰 갱신, 실패: reject)
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error || !token) {
      reject(error);
      return;
    }
    resolve(token);
  });
  failedQueue = [];
};

// 요청 URL을 pathname으로 정규화해 refresh 제외 대상인지 판별
const shouldSkipRefresh = (config?: AxiosRequestConfig) => {
  if (!config?.url) return false;

  try {
    const pathname = new URL(config.url, import.meta.env.VITE_API_BASE_URL)
      .pathname;
    return SKIP_REFRESH_ENDPOINTS.has(pathname);
  } catch {
    return false;
  }
};

// 실패한 요청의 Authorization 헤더에서 accessToken 추출
const getRequestAccessToken = (
  config: InternalAxiosRequestConfig
): string | null => {
  const authorization = config.headers.get('Authorization');

  if (typeof authorization !== 'string') return null;

  const match = /^Bearer\s+(.+)$/i.exec(authorization);
  return match?.[1] ?? null;
};

// refreshToken으로 accessToken을 재발급 받고 스토어에 저장
const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = useAuthStore.getState().refreshToken;

  if (!refreshToken) {
    throw new Error('Refresh token이 없습니다.');
  }

  const data = await postRefreshToken({ refreshToken });

  useAuthStore.getState().setTokens({
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    accessTokenExpiresIn: data.accessTokenExpiresIn,
  });

  return data.accessToken;
};

// refresh 실패 시 로그인 페이지로 이동
const redirectToLogin = () => {
  if (window.location.pathname === '/login') return;
  window.location.replace('/login');
};

// axios 인스턴스
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 : 스토어의 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터: 401 발생 시 토큰 갱신 후 기존 요청 재시도
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      shouldSkipRefresh(originalRequest)
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch(() => Promise.reject(error));
    }

    originalRequest._retry = true;

    // 다른 요청에서 토큰이 갱신된 경우 : refresh를 생략하고 새 토큰으로 재시도
    const requestAccessToken = getRequestAccessToken(originalRequest);
    const currentAccessToken = useAuthStore.getState().accessToken;

    if (currentAccessToken && requestAccessToken !== currentAccessToken) {
      originalRequest.headers.Authorization = `Bearer ${currentAccessToken}`;
      return axiosInstance(originalRequest);
    }

    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      useAuthStore.getState().clearAuth();
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
