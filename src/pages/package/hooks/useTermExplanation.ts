import { useMutation } from '@tanstack/react-query';
import { postTermExplanation } from '@pages/package/apis/policyApi';
import type { TermExplanationRequest } from '@pages/package/types/package';

export const useTermExplanation = (policyId: number) =>
  useMutation({
    mutationFn: (payload: TermExplanationRequest) =>
      postTermExplanation(policyId, payload),
  });
