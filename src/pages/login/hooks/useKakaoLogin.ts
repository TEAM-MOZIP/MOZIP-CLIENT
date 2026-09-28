import { useMutation } from '@tanstack/react-query';
import { postKakaoLogin } from '@pages/login/apis/authApi';
import { useAuthStore } from '@shared/stores/useAuthStore';
import type { KakaoLoginResponse } from '@shared/types/auth';

const KAKAO_AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_OAUTH_RETURN_PATH_KEY = 'kakao_oauth_return_path';

export const redirectToKakaoLogin = () => {
  const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirectUri = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    throw new Error(
      'VITE_KAKAO_REST_API_KEY 또는 VITE_KAKAO_REDIRECT_URI가 설정되지 않았습니다.'
    );
  }

  sessionStorage.setItem(KAKAO_OAUTH_RETURN_PATH_KEY, window.location.pathname);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
  });

  window.location.assign(`${KAKAO_AUTHORIZE_URL}?${params.toString()}`);
};

export const getKakaoOAuthReturnPath = () =>
  sessionStorage.getItem(KAKAO_OAUTH_RETURN_PATH_KEY);

export const clearKakaoOAuthReturnPath = () => {
  sessionStorage.removeItem(KAKAO_OAUTH_RETURN_PATH_KEY);
};

export const useKakaoLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);

  return useMutation({
    mutationFn: (code: string) => postKakaoLogin({ code }),
    onSuccess: (data: KakaoLoginResponse) => {
      setTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        accessTokenExpiresIn: data.accessTokenExpiresIn,
      });
    },
  });
};
