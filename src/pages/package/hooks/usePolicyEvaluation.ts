import { useQuery } from '@tanstack/react-query';
import { getPolicyEvaluation } from '@pages/package/apis/policyApi';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

// GET .../evaluation은 인증 필수 + 프로필 미등록 시 404(USER_PROFILE_NOT_FOUND).
// 404는 흔한 상태라 재시도할 필요 없음 — queryClient 기본 옵션이 4xx는 이미
// 재시도 안 하도록 돼 있어서 별도 retry 설정은 필요 없다.
export const usePolicyEvaluation = (policyId: number, enabled = true) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: ['policy-evaluation', policyId],
    queryFn: () => getPolicyEvaluation(policyId),
    enabled: enabled && isLoggedIn,
  });
};
