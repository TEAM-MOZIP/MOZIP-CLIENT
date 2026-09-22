import { useQuery } from '@tanstack/react-query';
import { getPolicySummary } from '@pages/package/apis/policyApi';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

// GET .../summary는 인증 필수(401) — 로그인 상태일 때만 호출한다.
export const usePolicySummary = (policyId: number) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: ['policy-summary', policyId],
    queryFn: () => getPolicySummary(policyId),
    enabled: isLoggedIn,
  });
};
