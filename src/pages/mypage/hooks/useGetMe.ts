import { useQuery } from '@tanstack/react-query';
import { getMe } from '@pages/mypage/apis/userApi';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

export const ME_QUERY_KEY = ['users', 'me'] as const;

export const useGetMe = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: ME_QUERY_KEY,
    queryFn: getMe,
    enabled: isLoggedIn,
  });
};
