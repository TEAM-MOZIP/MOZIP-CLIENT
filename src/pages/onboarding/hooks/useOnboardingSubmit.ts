import { useMutation } from '@tanstack/react-query';
import { putUserProfile } from '@pages/onboarding/apis/onboardingApi';

export const useOnboardingSubmit = () =>
  useMutation({
    mutationFn: putUserProfile,
  });
