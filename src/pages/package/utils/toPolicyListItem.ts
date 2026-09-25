import type {
  CategoryResponse,
  PolicyListCategory,
  PolicyListItem,
  PolicyListRegion,
  PolicyRecommendationResponse,
  PolicySummaryResponse,
  RegionResponse,
} from '@pages/package/types/package';

const toCategories = (
  categories: CategoryResponse[] | undefined
): PolicyListCategory[] =>
  (categories ?? []).flatMap((category) =>
    category.id !== undefined && category.name?.trim()
      ? [{ id: category.id, name: category.name }]
      : []
  );

const toRegions = (regions: RegionResponse[] | undefined): PolicyListRegion[] =>
  (regions ?? []).flatMap((region) =>
    region.id !== undefined && region.name?.trim()
      ? [{ id: region.id, name: region.name }]
      : []
  );

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
    categories: toCategories(response.categories),
    regionScope: response.regionScope ?? null,
    regions: toRegions(response.regions),
    eligibilityStatus: null,
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
    categories: toCategories(response.categories),
    regionScope: response.regionScope ?? null,
    regions: toRegions(response.regions),
    eligibilityStatus: response.eligibility?.status ?? null,
  };
};
