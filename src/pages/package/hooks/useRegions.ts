import { useQuery } from '@tanstack/react-query';
import { getRegions } from '@pages/package/apis/policyApi';

// 온보딩(pages/onboarding/hooks/useRegions.ts)과 queryKey가 같아서 캐시를 공유한다.
// 지역 목록을 쓰는 페이지가 늘어나면 shared로 승격하는 걸 고려.
export const useRegions = () =>
  useQuery({
    queryKey: ['regions'],
    queryFn: getRegions,
    staleTime: Infinity,
  });
