import { useQuery } from '@tanstack/react-query';

import { getMyNotifications } from '@shared/apis/notificationApi';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

export const NOTIFICATIONS_QUERY_KEY = ['notifications', 'me'] as const;

export const useGetNotifications = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEY,
    queryFn: getMyNotifications,
    enabled: isLoggedIn,
  });
};
