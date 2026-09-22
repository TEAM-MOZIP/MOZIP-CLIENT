import { useQuery } from '@tanstack/react-query';
import {
  getMyBookmarks,
  type GetMyBookmarksParams,
} from '@pages/mypage/apis/bookmarkApi';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

export const MY_BOOKMARKS_QUERY_KEY = ['bookmarks', 'me'] as const;

export const useGetMyBookmarks = (params: GetMyBookmarksParams = {}) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const page = params.page ?? 0;
  const size = params.size ?? 20;
  const sort = params.sort ?? 'createdAt,desc';

  return useQuery({
    queryKey: [...MY_BOOKMARKS_QUERY_KEY, { page, size, sort }],
    queryFn: () => getMyBookmarks({ page, size, sort }),
    enabled: isLoggedIn,
  });
};
