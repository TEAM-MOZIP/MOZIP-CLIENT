import { useQuery } from '@tanstack/react-query';
import { getMyProfile } from '@pages/onboarding/apis/onboardingApi';
import { isProfileNotFoundError } from '@pages/package/utils/isProfileNotFoundError';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

export const MY_PROFILE_QUERY_KEY = ['my-profile'] as const;

// 로그인 사용자의 프로필. 온보딩을 건너뛰어 프로필이 없으면(404) null을 반환한다.
export const useMyProfile = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: MY_PROFILE_QUERY_KEY,
    queryFn: async () => {
      try {
        return await getMyProfile();
      } catch (error) {
        if (isProfileNotFoundError(error)) return null;
        throw error;
      }
    },
    enabled: isLoggedIn,
  });
};
