import type {
  ApplicationGuideResponse,
  ApplicationGuideStepResponse,
  CategoryResponse,
  ConditionResult,
  EligibilityResponse,
  PageResponsePolicyRecommendationResponse,
  PageResponsePolicySummaryResponse,
  PolicyDetailResponse,
  PolicyEligibilityResponse,
  PolicyEvaluationResponse,
  PolicyRecommendationResponse,
  PolicySummaryContentResponse,
  PolicySummaryResponse,
  RegionResponse,
  TermExplanationRequest,
  TermExplanationResponse,
} from '@shared/apis/generated/Api';

export type {
  ApplicationGuideResponse,
  ApplicationGuideStepResponse,
  CategoryResponse,
  ConditionResult,
  EligibilityResponse,
  PageResponsePolicyRecommendationResponse,
  PageResponsePolicySummaryResponse,
  PolicyDetailResponse,
  PolicyEligibilityResponse,
  PolicyEvaluationResponse,
  PolicyRecommendationResponse,
  PolicySummaryContentResponse,
  PolicySummaryResponse,
  RegionResponse,
  TermExplanationRequest,
  TermExplanationResponse,
};

export type PolicyAvailability = NonNullable<
  PolicySummaryResponse['availability']
>;

// swagger-typescript-api는 쿼리 파라미터 전용 enum은 뽑아주지 않는다(--no-client).
// api-spec.md의 "정책 목록 검색" 쿼리 스펙 기준으로 직접 선언 — 서버가 연령 구간을
// 추가/변경하면 이 배열도 같이 갱신해야 한다.
export const AGE_GROUPS = [
  'UNDER_19',
  'AGE_19_24',
  'AGE_25_29',
  'AGE_30_34',
  'AGE_35_49',
  'AGE_50_64',
  'AGE_65_PLUS',
] as const;

export type AgeGroup = (typeof AGE_GROUPS)[number];

// 정책 목록 "상태" 필터. 서버가 오늘 날짜 기준 신청 가능 상태로 계산해 거른다(모든 정렬에서 지원).
export const AVAILABILITY_FILTERS = [
  'OPEN',
  'CLOSING_SOON',
  'UPCOMING',
] as const;

export type AvailabilityFilter = (typeof AVAILABILITY_FILTERS)[number];

export type PolicySort =
  | 'createdAt,desc'
  | 'createdAt,asc'
  | 'applicationEndDate,asc'
  | 'applicationEndDate,desc';

// 목록 화면의 정렬 드롭다운에서 고르는 값. 'recommended'는 서버 sort
// 파라미터가 아니라 GET /api/policies/recommended(고정 정렬)를 쓰라는 신호다.
export type PolicySortOption = PolicySort | 'recommended';

export type PolicyListSource = 'public' | 'recommended' | 'personalized';

// GET /api/policies(PolicySummaryResponse)와 GET /api/recommendations/policies
// (PolicyRecommendationResponse) 두 응답 shape을 화면 하나로 그리기 위한 통합 뷰모델.
export type PolicyListCategory = { id: number; name: string };
export type PolicyListRegion = { id: number; name: string };

export type PolicyListItem = {
  id: number;
  title: string;
  organizationName: string;
  applicationType: 'PERIOD' | 'ALWAYS' | 'UNKNOWN';
  applicationStartDate: string | null;
  applicationEndDate: string | null;
  availability: PolicyAvailability | null;
  bookmarked: boolean | null; // null = 북마크 정보 없음(공개 목록 응답)
  categories: PolicyListCategory[];
  // 전국 정책은 regionScope가 NATIONAL이고 regions는 비어 있다.
  regionScope: 'NATIONAL' | 'REGIONAL' | null;
  regions: PolicyListRegion[];
  // 개인화(로그인+프로필) 응답에만 있는 자격 판정. 공개 목록·북마크는 null.
  eligibilityStatus: EligibilityStatus | null;
  // 정책 대상 나이 범위(만). 둘 다 null이면 연령 제한 없음. 북마크처럼 정보가 없는 응답은 ageRange 자체가 null.
  ageRange: { min: number | null; max: number | null } | null;
};

export type EligibilityStatus = NonNullable<EligibilityResponse['status']>;

export type PolicyListFilters = {
  keyword?: string;
  categoryId?: number;
  regionId?: number;
  ageGroup?: AgeGroup; // personalized 소스에선 서버가 지원하지 않아 무시됨
  availability?: AvailabilityFilter;
  sort?: PolicySortOption; // personalized 소스에선 서버가 지원하지 않아 무시됨
  // true면 로그인 사용자 프로필 기준 맞춤 추천 목록을 요청한다(연령·정렬 무시).
  personalized?: boolean;
};

// ---- 대상자별 정책 패키지 ----
// 서버 스펙(/api/policies/packages, /api/recommendations/packages)이 generated/Api.ts에 반영되기 전이라 직접 정의한다.
export type PolicyPackageSummaryResponse = {
  packageId?: string;
  policyCount?: number;
};

export type PolicyPackageSectionResponse<T> = {
  sectionKey?: string;
  sectionName?: string;
  totalCount?: number;
  policies?: T[];
};

export type PolicyPackageDetailResponse<T> = {
  packageId?: string;
  policyCount?: number;
  sections?: PolicyPackageSectionResponse<T>[];
};

// 공개/개인화 응답을 화면 하나로 그리기 위한 뷰모델
export type PolicyPackageSection = {
  key: string;
  name: string;
  totalCount: number;
  // 미리보기(섹션당 최대 6개)
  policies: PolicyListItem[];
};

export type PolicyPackageDetail = {
  packageId: string;
  policyCount: number;
  sections: PolicyPackageSection[];
};
