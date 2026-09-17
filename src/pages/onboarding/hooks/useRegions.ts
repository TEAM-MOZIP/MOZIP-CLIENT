import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@pages/onboarding/apis/onboardingApi';

export const useRegions = () =>
  useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
    staleTime: Infinity,
  });
