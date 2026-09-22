import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookmark, postBookmark } from '@pages/package/apis/policyApi';

type ToggleBookmarkPayload = {
  policyId: number;
  bookmarked: boolean;
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ policyId, bookmarked }: ToggleBookmarkPayload) =>
      bookmarked ? postBookmark(policyId) : deleteBookmark(policyId),
    onSuccess: (_data, { policyId }) => {
      // 목록(무한스크롤 페이지들)과 상세 모달 캐시를 둘 다 최신화해서
      // 목록에서 토글하든 상세에서 토글하든 서로 어긋나지 않게 한다.
      queryClient.invalidateQueries({ queryKey: ['policies'] });
      queryClient.invalidateQueries({ queryKey: ['policy-detail', policyId] });
    },
  });
};
