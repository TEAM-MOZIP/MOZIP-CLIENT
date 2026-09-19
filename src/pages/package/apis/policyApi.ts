import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type {
  ApplicationGuideResponse,
  CategoryResponse,
  PageResponsePolicyRecommendationResponse,
  PageResponsePolicySummaryResponse,
  PolicyDetailResponse,
  PolicyListFilters,
  RegionResponse,
} from '@pages/package/types/package';

export type PolicyPageParams = PolicyListFilters & {
  page: number;
  size: number;
};

export const getPolicies = async (params: PolicyPageParams) => {
  const { data } = await axiosInstance.get<PageResponsePolicySummaryResponse>(
    ENDPOINTS.POLICIES.LIST,
    { params }
  );
  return data;
};

export const getPersonalizedPolicies = async (
  params: Omit<PolicyPageParams, 'ageGroup' | 'sort'>
) => {
  const { data } =
    await axiosInstance.get<PageResponsePolicyRecommendationResponse>(
      ENDPOINTS.RECOMMENDATIONS.POLICIES,
      { params }
    );
  return data;
};

export const getCategories = async () => {
  const { data } = await axiosInstance.get<CategoryResponse[]>(
    ENDPOINTS.CATEGORIES
  );
  return data;
};

export const getRegions = async () => {
  const { data } = await axiosInstance.get<RegionResponse[]>(ENDPOINTS.REGIONS);
  return data;
};

export const getPolicyDetail = async (policyId: number) => {
  const { data } = await axiosInstance.get<PolicyDetailResponse>(
    ENDPOINTS.POLICIES.DETAIL(policyId)
  );
  return data;
};

export const getApplicationGuide = async (policyId: number) => {
  const { data } = await axiosInstance.get<ApplicationGuideResponse>(
    ENDPOINTS.POLICIES.APPLICATION_GUIDE(policyId)
  );
  return data;
};

export const postBookmark = async (policyId: number) => {
  await axiosInstance.post(ENDPOINTS.BOOKMARKS.CREATE, { policyId });
};

export const deleteBookmark = async (policyId: number) => {
  await axiosInstance.delete(ENDPOINTS.BOOKMARKS.DELETE(policyId));
};
