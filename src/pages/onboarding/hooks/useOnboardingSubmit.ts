import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MY_PROFILE_QUERY_KEY } from '@pages/mypage/hooks/useGetMyProfile';
import { putUserProfile } from '@pages/onboarding/apis/onboardingApi';

export const useOnboardingSubmit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(MY_PROFILE_QUERY_KEY, data);
    },
  });
};
