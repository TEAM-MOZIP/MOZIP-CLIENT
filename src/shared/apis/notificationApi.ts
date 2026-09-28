import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type { GetMyNotificationsData } from '@shared/apis/generated/Api';

export const getMyNotifications = async (): Promise<GetMyNotificationsData> => {
  const { data } = await axiosInstance.get<GetMyNotificationsData>(
    ENDPOINTS.NOTIFICATIONS.LIST
  );
  return data;
};

export const markNotificationAsRead = async (
  notificationId: string | number
): Promise<void> => {
  await axiosInstance.get(ENDPOINTS.NOTIFICATIONS.READ(notificationId));
};
