import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type { GetMyInfoData } from '@shared/apis/generated/Api';

export const getMe = async (): Promise<GetMyInfoData> => {
  const { data } = await axiosInstance.get<GetMyInfoData>(ENDPOINTS.AUTH.ME);
  return data;
};
