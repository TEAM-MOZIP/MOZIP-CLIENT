import { useMutation, useQueryClient } from '@tanstack/react-query';

import { markNotificationAsRead } from '@shared/apis/notificationApi';
import type { GetMyNotificationsData } from '@shared/apis/generated/Api';
import { NOTIFICATIONS_QUERY_KEY } from '@shared/hooks/useGetNotifications';

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notificationId: number) =>
      markNotificationAsRead(notificationId),
    onMutate: async (notificationId) => {
      await queryClient.cancelQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });

      const previousNotifications =
        queryClient.getQueryData<GetMyNotificationsData>(
          NOTIFICATIONS_QUERY_KEY
        );

      queryClient.setQueryData<GetMyNotificationsData>(
        NOTIFICATIONS_QUERY_KEY,
        (prev) =>
          prev?.map((item) =>
            item.notificationId === notificationId
              ? { ...item, read: true }
              : item
          )
      );

      return { previousNotifications };
    },
    onError: (_error, _notificationId, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          NOTIFICATIONS_QUERY_KEY,
          context.previousNotifications
        );
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEY });
    },
  });
};
