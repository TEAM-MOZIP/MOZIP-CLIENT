import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type {
  GetMyInfoData,
  GetMyProfileData,
} from '@shared/apis/generated/Api';
import { isProfileNotFoundError } from '@pages/package/utils/isProfileNotFoundError';

export const getMe = async (): Promise<GetMyInfoData> => {
  const { data } = await axiosInstance.get<GetMyInfoData>(ENDPOINTS.AUTH.ME);
  return data;
};

export const getMyProfile = async (): Promise<GetMyProfileData | null> => {
  try {
    const { data } = await axiosInstance.get<GetMyProfileData>(
      ENDPOINTS.USER_PROFILE.ME
    );
    return data;
  } catch (error) {
    if (isProfileNotFoundError(error)) return null;
    throw error;
  }
};
