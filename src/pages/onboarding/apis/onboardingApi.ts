import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type {
  RegionResponse,
  UserProfileResponse,
  UserProfileUpdateRequest,
} from '@pages/onboarding/types/onboarding';

export const getMyProfile = async () => {
  const { data } = await axiosInstance.get<UserProfileResponse>(
    ENDPOINTS.USER_PROFILE.ME
  );
  return data;
};

export const putUserProfile = async (payload: UserProfileUpdateRequest) => {
  const { data } = await axiosInstance.put<UserProfileResponse>(
    ENDPOINTS.USER_PROFILE.ME,
    payload
  );
  return data;
};

export const getRegions = async () => {
  const { data } = await axiosInstance.get<RegionResponse[]>(ENDPOINTS.REGIONS);
  return data;
};
