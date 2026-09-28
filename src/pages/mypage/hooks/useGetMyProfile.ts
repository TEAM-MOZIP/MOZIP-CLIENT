import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@pages/mypage/apis/userApi';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

export const MY_PROFILE_QUERY_KEY = ['users', 'me', 'profile'] as const;

export const useGetMyProfile = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: getMyProfile,
    enabled: isLoggedIn,
  });
};
