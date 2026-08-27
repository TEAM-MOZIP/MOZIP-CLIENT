import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type { KakaoLoginRequest, KakaoLoginResponse } from '@shared/types/auth';

export const postKakaoLogin = async (payload: KakaoLoginRequest) => {
  const { data } = await axiosInstance.post<KakaoLoginResponse>(
    ENDPOINTS.AUTH.KAKAO_LOGIN,
    payload
  );
  return data;
};
