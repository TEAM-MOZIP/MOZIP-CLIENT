import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type {
  ApplicationGuideResponse,
  CategoryResponse,
  PageResponsePolicyRecommendationResponse,
  PageResponsePolicySummaryResponse,
  PolicyDetailResponse,
  PolicyEvaluationResponse,
  PolicyListFilters,
  PolicyPackageDetailResponse,
  PolicyPackageSummaryResponse,
  PolicyRecommendationResponse,
  PolicySort,
  PolicySummaryResponse,
  PolicySummaryContentResponse,
  RegionResponse,
  TermExplanationRequest,
  TermExplanationResponse,
} from '@pages/package/types/package';

export type PolicyPageParams = Omit<PolicyListFilters, 'sort'> & {
  sort?: PolicySort;
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

// 인증 불필요, 신청 가능 여부 기준 고정 정렬 — ageGroup/sort 파라미터 미지원
export const getRecommendedPolicies = async (
  params: Omit<PolicyPageParams, 'ageGroup' | 'sort'>
) => {
  const { data } = await axiosInstance.get<PageResponsePolicySummaryResponse>(
    ENDPOINTS.POLICIES.RECOMMENDED,
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

export const getPolicySummary = async (policyId: number) => {
  const { data } = await axiosInstance.get<PolicySummaryContentResponse>(
    ENDPOINTS.POLICIES.SUMMARY(policyId)
  );
  return data;
};

export const getPolicyEvaluation = async (policyId: number) => {
  const { data } = await axiosInstance.get<PolicyEvaluationResponse>(
    ENDPOINTS.RECOMMENDATIONS.POLICY_EVALUATION(policyId)
  );
  return data;
};

export const postTermExplanation = async (
  policyId: number,
  payload: TermExplanationRequest
) => {
  const { data } = await axiosInstance.post<TermExplanationResponse>(
    ENDPOINTS.POLICIES.TERMS_EXPLAIN(policyId),
    payload
  );
  return data;
};

export const postBookmark = async (policyId: number) => {
  await axiosInstance.post(ENDPOINTS.BOOKMARKS.CREATE, { policyId });
};

export const deleteBookmark = async (policyId: number) => {
  await axiosInstance.delete(ENDPOINTS.BOOKMARKS.DELETE(policyId));
};

// ---- 대상자별 정책 패키지 ----
// 공개(비로그인)와 개인화(로그인+프로필) API가 같은 구조이고, 정책 항목 타입만 다르다.

export type PackageSectionPageParams = { page: number; size: number };

export const getPackages = async () => {
  const { data } = await axiosInstance.get<PolicyPackageSummaryResponse[]>(
    ENDPOINTS.POLICIES.PACKAGES
  );
  return data;
};

export const getPersonalizedPackages = async () => {
  const { data } = await axiosInstance.get<PolicyPackageSummaryResponse[]>(
    ENDPOINTS.RECOMMENDATIONS.PACKAGES
  );
  return data;
};

export const getPackageDetail = async (packageId: string) => {
  const { data } = await axiosInstance.get<
    PolicyPackageDetailResponse<PolicySummaryResponse>
  >(ENDPOINTS.POLICIES.PACKAGE_DETAIL(packageId));
  return data;
};

export const getPersonalizedPackageDetail = async (packageId: string) => {
  const { data } = await axiosInstance.get<
    PolicyPackageDetailResponse<PolicyRecommendationResponse>
  >(ENDPOINTS.RECOMMENDATIONS.PACKAGE_DETAIL(packageId));
  return data;
};

export const getPackageSectionPolicies = async (
  packageId: string,
  sectionKey: string,
  params: PackageSectionPageParams
) => {
  const { data } = await axiosInstance.get<PageResponsePolicySummaryResponse>(
    ENDPOINTS.POLICIES.PACKAGE_SECTION(packageId, sectionKey),
    { params }
  );
  return data;
};

export const getPersonalizedPackageSectionPolicies = async (
  packageId: string,
  sectionKey: string,
  params: PackageSectionPageParams
) => {
  const { data } =
    await axiosInstance.get<PageResponsePolicyRecommendationResponse>(
      ENDPOINTS.RECOMMENDATIONS.PACKAGE_SECTION(packageId, sectionKey),
      { params }
    );
  return data;
};
