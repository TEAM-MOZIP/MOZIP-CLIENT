import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeBookmark } from '@pages/mypage/apis/bookmarkApi';
import { MY_BOOKMARKS_QUERY_KEY } from '@pages/mypage/hooks/useGetMyBookmarks';

export const useRemoveBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (policyId: string | number) => removeBookmark(policyId),
    onSuccess: (_data, policyId) => {
      void queryClient.invalidateQueries({ queryKey: MY_BOOKMARKS_QUERY_KEY });
      // 반대 방향도 맞춘다: 마이페이지에서 해제하면 정책 목록·상세의 북마크 표시도 갱신.
      void queryClient.invalidateQueries({ queryKey: ['policies'] });
      void queryClient.invalidateQueries({
        queryKey: ['policy-detail', Number(policyId)],
      });
    },
  });
};
