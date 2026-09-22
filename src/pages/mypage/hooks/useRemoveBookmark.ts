import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeBookmark } from '@pages/mypage/apis/bookmarkApi';
import { MY_BOOKMARKS_QUERY_KEY } from '@pages/mypage/hooks/useGetMyBookmarks';

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (policyId: string | number) => removeBookmark(policyId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: MY_BOOKMARKS_QUERY_KEY });
    },
  });
};
