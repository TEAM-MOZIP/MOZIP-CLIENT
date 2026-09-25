/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export type AddBookmarkData = BookmarkResponse;

export interface ApplicationGuideResponse {
  /** @format date */
  applicationEndDate?: string;
  /** @format date */
  applicationStartDate?: string;
  applicationType?: 'PERIOD' | 'ALWAYS' | 'UNKNOWN';
  applicationUrl?: string;
  availability?: PolicyAvailabilityResponse;
  contactInfo?: string;
  notes?: string;
  /** @format int64 */
  policyId?: number;
  requiredDocuments?: string[];
  requirements?: PolicyEligibilityResponse;
  requirementsDescription?: string;
  steps?: ApplicationGuideStepResponse[];
}

export interface ApplicationGuideStepResponse {
  description?: string;
  /** @format int32 */
  order?: number;
  title?: string;
}

export interface AvailabilityResponse {
  closingSoon?: boolean;
  reason?:
    | 'ALWAYS_OPEN'
    | 'ALWAYS_APPLICATION_TYPE'
    | 'WITHIN_APPLICATION_PERIOD'
    | 'BEFORE_APPLICATION_PERIOD'
    | 'AFTER_APPLICATION_PERIOD'
    | 'CLOSED'
    | 'DRAFT'
    | 'SUSPENDED'
    | 'UNKNOWN_APPLICATION_TYPE'
    | 'MISSING_APPLICATION_PERIOD'
    | 'INVALID_APPLICATION_PERIOD';
  status?: 'AVAILABLE' | 'UNAVAILABLE' | 'NEEDS_REVIEW';
}

export interface BookmarkCreateRequest {
  /** @format int64 */
  policyId: number;
}

export interface BookmarkResponse {
  /** @format date */
  applicationEndDate?: string;
  /** @format date */
  applicationStartDate?: string;
  availability?: PolicyAvailabilityResponse;
  /** @format int64 */
  bookmarkId?: number;
  /** @format date-time */
  bookmarkedAt?: string;
  organizationName?: string;
  /** @format int64 */
  policyId?: number;
  title?: string;
  applicationType?: 'PERIOD' | 'ALWAYS' | 'UNKNOWN';
  categories?: CategoryResponse[];
  regionScope?: 'NATIONAL' | 'REGIONAL';
  regions?: RegionResponse[];
  /** @format int32 정책 대상 최소 나이(만). 제한 없으면 null */
  minimumAge?: number | null;
  /** @format int32 정책 대상 최대 나이(만). 제한 없으면 null */
  maximumAge?: number | null;
}

export interface CategoryResponse {
  code?: string;
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface ChatMatchedPolicyResponse {
  eligibilityStatus?: 'ELIGIBLE' | 'INELIGIBLE' | 'NEEDS_REVIEW';
  /** @format int64 */
  policyId?: number;
  title?: string;
}

export interface ChatRequest {
  history?: ChatTurn[];
  /** @minLength 1 */
  message: string;
}

export interface ChatResponse {
  matchedPolicies?: ChatMatchedPolicyResponse[];
  reply?: string;
  unresolvedConditions?: ChatUnresolvedConditionResponse[];
  /** 질문 의도에 따른 답변 유형 */
  responseType?:
    | 'RECOMMEND'
    | 'COMPARE'
    | 'HOW_TO_APPLY'
    | 'ELIGIBILITY'
    | 'CLARIFY'
    | 'TERM'
    | 'NO_RESULT'
    | 'GENERAL';
  /** 화면에 순서대로 그릴 답변 블록 */
  blocks?: ChatBlockResponse[];
  /** 답변 아래 칩으로 보여줄 후속 질문 */
  followUps?: string[];
}

export interface ChatBlockResponse {
  type?:
    | 'TEXT'
    | 'POLICY_GROUP'
    | 'COMPARISON'
    | 'CONCLUSION'
    | 'STEPS'
    | 'CHECKLIST'
    | 'TERM'
    | 'QUICK_REPLIES'
    | 'CONDITIONS'
    | 'LINKS';
  text?: string | null;
  title?: string | null;
  example?: string | null;
  policies?: ChatPolicyCardResponse[];
  columns?: { policyId?: number; title?: string }[];
  rows?: { label?: string; values?: string[] }[];
  steps?: { title?: string; description?: string | null }[];
  items?: string[];
  conditions?: ConditionResult[];
  links?: { applicationUrl?: string | null; sourceUrl?: string | null } | null;
}

export interface ChatPolicyCardResponse {
  /** @format int64 */
  policyId?: number;
  title?: string;
  summary?: string | null;
  reason?: string | null;
  highlight?: string | null;
  eligibilityStatus?: 'ELIGIBLE' | 'INELIGIBLE' | 'NEEDS_REVIEW' | null;
  applicationType?: 'PERIOD' | 'ALWAYS' | 'UNKNOWN';
  /** @format date */
  applicationStartDate?: string | null;
  /** @format date */
  applicationEndDate?: string | null;
  availability?: PolicyAvailabilityResponse;
  categories?: CategoryResponse[];
  regionScope?: 'NATIONAL' | 'REGIONAL';
  regions?: RegionResponse[];
  minimumAge?: number | null;
  maximumAge?: number | null;
}

export interface ChatTurn {
  message?: string;
  reply?: string;
  /** 그 턴의 답변에 카드로 보여준 정책 id(후속 질문 해석용) */
  policyIds?: number[];
}

export interface ChatUnresolvedConditionResponse {
  axis?:
    | 'gender'
    | 'age'
    | 'region'
    | 'employment_status'
    | 'household_type'
    | 'income';
  rawText?: string;
}

export interface ConditionResult {
  reason?: string;
  status?: 'MATCHED' | 'NOT_MATCHED' | 'NEEDS_REVIEW';
  type?:
    | 'AGE'
    | 'REGION'
    | 'INCOME'
    | 'EMPLOYMENT_STATUS'
    | 'HOUSEHOLD_TYPE'
    | 'GENDER'
    | 'ADDITIONAL_CONDITIONS';
}

export interface EligibilityResponse {
  conditionResults?: ConditionResult[];
  overallReason?: string;
  status?: 'ELIGIBLE' | 'INELIGIBLE' | 'NEEDS_REVIEW';
}

export type ExplainTermData = TermExplanationResponse;

export type GetApplicationGuideData = ApplicationGuideResponse;

export type GetCategoriesData = CategoryResponse[];

export type GetEvaluationData = PolicyEvaluationResponse;

export type GetMyBookmarksData = PageResponseBookmarkResponse;

export type GetMyInfoData = UserResponse;

export type GetMyNotificationsData = NotificationResponse[];

export type GetMyProfileData = UserProfileResponse;

export type GetPackages1Data = PublicPolicyPackageResponse[];

export type GetPackagesData = PolicyPackageResponse[];

export type GetPolicyDetailData = PolicyDetailResponse;

export type GetRecommendationsData = PageResponsePolicyRecommendationResponse;

export type GetRecommendedPoliciesData = PageResponsePolicySummaryResponse;

export type GetRegionsData = RegionResponse[];

export type GetSummaryData = PolicySummaryContentResponse;

export type KakaoLoginData = TokenResponse;

export interface KakaoLoginRequest {
  /** @minLength 1 */
  code: string;
}

export type LogoutData = any;

export type MarkAsReadData = any;

export interface NotificationResponse {
  content?: string;
  /** @format date-time */
  createdAt?: string;
  /** @format int64 */
  notificationId?: number;
  /** @format int64 */
  policyId?: number;
  read?: boolean;
  title?: string;
}

export interface PageResponseBookmarkResponse {
  content?: BookmarkResponse[];
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
}

export interface PageResponsePolicyRecommendationResponse {
  content?: PolicyRecommendationResponse[];
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
}

export interface PageResponsePolicySummaryResponse {
  content?: PolicySummaryResponse[];
  first?: boolean;
  last?: boolean;
  /** @format int32 */
  page?: number;
  /** @format int32 */
  size?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int32 */
  totalPages?: number;
}

export interface Pageable {
  /**
   * @format int32
   * @min 0
   */
  page?: number;
  /**
   * @format int32
   * @min 1
   */
  size?: number;
  sort?: string[];
}

export interface PolicyAvailabilityResponse {
  closingSoon?: boolean;
  reason?:
    | 'ALWAYS_OPEN'
    | 'ALWAYS_APPLICATION_TYPE'
    | 'WITHIN_APPLICATION_PERIOD'
    | 'BEFORE_APPLICATION_PERIOD'
    | 'AFTER_APPLICATION_PERIOD'
    | 'CLOSED'
    | 'DRAFT'
    | 'SUSPENDED'
    | 'UNKNOWN_APPLICATION_TYPE'
    | 'MISSING_APPLICATION_PERIOD'
    | 'INVALID_APPLICATION_PERIOD';
  status?: 'AVAILABLE' | 'UNAVAILABLE' | 'NEEDS_REVIEW';
}

export interface PolicyDetailResponse {
  /** @format date */
  applicationEndDate?: string;
  applicationMethod?: string;
  /** @format date */
  applicationStartDate?: string;
  applicationType?: 'PERIOD' | 'ALWAYS' | 'UNKNOWN';
  availability?: PolicyAvailabilityResponse;
  benefitDescription?: string;
  bookmarked?: boolean;
  description?: string;
  eligibility?: PolicyEligibilityResponse;
  /** @format int64 */
  id?: number;
  organizationName?: string;
  regionScope?: 'NATIONAL' | 'REGIONAL';
  sourceUrl?: string;
  status?: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ALWAYS_OPEN' | 'SUSPENDED';
  summary?: string;
  targetDescription?: string;
  title?: string;
}

export interface PolicyEligibilityResponse {
  additionalConditions?: Record<string, any>;
  allowedEmploymentStatuses?: string[];
  allowedHouseholdTypes?: string[];
  genderCondition?: 'MALE' | 'FEMALE';
  incomeType?: 'ABSOLUTE' | 'MEDIAN_PERCENTAGE';
  /** @format int32 */
  maximumAge?: number;
  /** @format int32 */
  maximumIncomeValue?: number;
  /** @format int32 */
  minimumAge?: number;
  /** @format int32 */
  minimumIncomeValue?: number;
}

export interface PolicyEvaluationResponse {
  availability?: AvailabilityResponse;
  eligibility?: EligibilityResponse;
  /** @format int64 */
  policyId?: number;
}

export interface PolicyPackageResponse {
  /** @format int64 */
  categoryId?: number;
  categoryName?: string;
  policies?: PolicyRecommendationResponse[];
}

export interface PolicyRecommendationResponse {
  categories?: CategoryResponse[];
  /** @format date */
  applicationEndDate?: string;
  /** @format date */
  applicationStartDate?: string;
  applicationType?: 'PERIOD' | 'ALWAYS' | 'UNKNOWN';
  availability?: AvailabilityResponse;
  bookmarked?: boolean;
  eligibility?: EligibilityResponse;
  organizationName?: string;
  /** @format int64 */
  policyId?: number;
  /** @format double */
  semanticScore?: number;
  title?: string;
  regionScope?: 'NATIONAL' | 'REGIONAL';
  regions?: RegionResponse[];
  /** @format int32 정책 대상 최소 나이(만). 제한 없으면 null */
  minimumAge?: number | null;
  /** @format int32 정책 대상 최대 나이(만). 제한 없으면 null */
  maximumAge?: number | null;
}

export interface PolicySummaryContentResponse {
  /** @format int64 */
  policyId?: number;
  summary?: string;
}

export interface PolicySummaryResponse {
  categories?: CategoryResponse[];
  /** @format date */
  applicationEndDate?: string;
  /** @format date */
  applicationStartDate?: string;
  applicationType?: 'PERIOD' | 'ALWAYS' | 'UNKNOWN';
  availability?: PolicyAvailabilityResponse;
  /** @format int64 */
  id?: number;
  organizationName?: string;
  regionScope?: 'NATIONAL' | 'REGIONAL';
  status?: 'DRAFT' | 'OPEN' | 'CLOSED' | 'ALWAYS_OPEN' | 'SUSPENDED';
  summary?: string;
  title?: string;
  regions?: RegionResponse[];
  /** 로그인 사용자의 북마크 여부. 비로그인 조회면 null */
  bookmarked?: boolean | null;
  /** @format int32 정책 대상 최소 나이(만). 제한 없으면 null */
  minimumAge?: number | null;
  /** @format int32 정책 대상 최대 나이(만). 제한 없으면 null */
  maximumAge?: number | null;
}

export interface PublicPolicyPackageResponse {
  /** @format int64 */
  categoryId?: number;
  categoryName?: string;
  policies?: PolicySummaryResponse[];
}

export type RefreshData = TokenResponse;

export interface RefreshTokenRequest {
  /** @minLength 1 */
  refreshToken: string;
}

export interface RegionResponse {
  code?: string;
  /** @format int64 */
  id?: number;
  name?: string;
}

export type RemoveBookmarkData = any;

export type SearchPoliciesData = PageResponsePolicySummaryResponse;

export type SendMessageData = ChatResponse;

export interface TermExplanationRequest {
  /** @minLength 1 */
  context: string;
  /** @minLength 1 */
  term: string;
}

export interface TermExplanationResponse {
  explanation?: string;
}

export interface TokenResponse {
  accessToken?: string;
  /** @format int64 */
  accessTokenExpiresIn?: number;
  isNewUser?: boolean;
  refreshToken?: string;
}

export type UpsertMyProfileData = UserProfileResponse;

export interface UserProfileResponse {
  /** @format date */
  birthDate?: string;
  employmentStatus?: 'EMPLOYED' | 'UNEMPLOYED' | 'JOB_SEEKER';
  gender?: 'MALE' | 'FEMALE';
  householdType?: 'SINGLE' | 'ELDERLY' | 'SINGLE_PARENT' | 'DISABLED';
  incomeType?: 'ABSOLUTE' | 'MEDIAN_PERCENTAGE';
  /** @format int32 */
  incomeValue?: number;
  /** @format int64 */
  regionId?: number;
  regionName?: string;
  /** @format int64 */
  userId?: number;
}

export interface UserProfileUpdateRequest {
  /** @format date */
  birthDate: string;
  employmentStatus: 'EMPLOYED' | 'UNEMPLOYED' | 'JOB_SEEKER';
  gender: 'MALE' | 'FEMALE';
  householdType: 'SINGLE' | 'ELDERLY' | 'SINGLE_PARENT' | 'DISABLED';
  incomeType: 'ABSOLUTE' | 'MEDIAN_PERCENTAGE';
  /** @format int32 */
  incomeValue: number;
  /** @format int64 */
  regionId: number;
}

export interface UserResponse {
  email?: string;
  /** @format int64 */
  id?: number;
  nickname?: string;
  profileImageUrl?: string;
  provider?: 'LOCAL' | 'KAKAO';
}
