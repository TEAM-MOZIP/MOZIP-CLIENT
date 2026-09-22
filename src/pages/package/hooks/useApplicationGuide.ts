import { useQuery } from '@tanstack/react-query';
import { getApplicationGuide } from '@pages/package/apis/policyApi';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

// GET .../application-guide는 인증 필수(401) — 로그인 상태일 때만 호출한다.
export const useApplicationGuide = (policyId: number) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: ['application-guide', policyId],
    queryFn: () => getApplicationGuide(policyId),
    enabled: isLoggedIn,
  });
};
