import type {
  PolicyListItem,
  PolicyRecommendationResponse,
  PolicySummaryResponse,
} from '@pages/package/types/package';

export const fromPolicySummary = (
  response: PolicySummaryResponse
): PolicyListItem | null => {
  if (response.id === undefined) return null;

  return {
    id: response.id,
    title: response.title ?? '',
    organizationName: response.organizationName ?? '',
    applicationType: response.applicationType ?? 'UNKNOWN',
    applicationStartDate: response.applicationStartDate ?? null,
    applicationEndDate: response.applicationEndDate ?? null,
    availability: response.availability ?? null,
    bookmarked: null,
  };
};

export const fromPolicyRecommendation = (
  response: PolicyRecommendationResponse
): PolicyListItem | null => {
  if (response.policyId === undefined) return null;

  return {
    id: response.policyId,
    title: response.title ?? '',
    organizationName: response.organizationName ?? '',
    applicationType: response.applicationType ?? 'UNKNOWN',
    applicationStartDate: response.applicationStartDate ?? null,
    applicationEndDate: response.applicationEndDate ?? null,
    availability: response.availability ?? null,
    bookmarked: response.bookmarked ?? false,
  };
};
