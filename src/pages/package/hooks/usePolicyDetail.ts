import { useQuery } from '@tanstack/react-query';
import { getPolicyDetail } from '@pages/package/apis/policyApi';

export const usePolicyDetail = (policyId: number) =>
  useQuery({
    queryKey: ['policy-detail', policyId],
    queryFn: () => getPolicyDetail(policyId),
  });
