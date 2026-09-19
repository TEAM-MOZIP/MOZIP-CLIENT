import type {
  ApplicationGuideResponse,
  ApplicationGuideStepResponse,
  CategoryResponse,
  PageResponsePolicyRecommendationResponse,
  PageResponsePolicySummaryResponse,
  PolicyDetailResponse,
  PolicyEligibilityResponse,
  PolicyRecommendationResponse,
  PolicySummaryResponse,
  RegionResponse,
} from '@shared/apis/generated/Api';

export type {
  ApplicationGuideResponse,
  ApplicationGuideStepResponse,
  CategoryResponse,
  PageResponsePolicyRecommendationResponse,
  PageResponsePolicySummaryResponse,
  PolicyDetailResponse,
  PolicyEligibilityResponse,
  PolicyRecommendationResponse,
  PolicySummaryResponse,
  RegionResponse,
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

export type PolicySort =
  | 'createdAt,desc'
  | 'createdAt,asc'
  | 'applicationEndDate,asc'
  | 'applicationEndDate,desc';

export type PolicyListSource = 'public' | 'personalized';

// GET /api/policies(PolicySummaryResponse)와 GET /api/recommendations/policies
// (PolicyRecommendationResponse) 두 응답 shape을 화면 하나로 그리기 위한 통합 뷰모델.
// 카테고리/지역명은 두 응답 모두에 없어서 뷰모델에도 넣지 않는다.
export type PolicyListItem = {
  id: number;
  title: string;
  organizationName: string;
  applicationType: 'PERIOD' | 'ALWAYS' | 'UNKNOWN';
  applicationStartDate: string | null;
  applicationEndDate: string | null;
  availability: PolicyAvailability | null;
  bookmarked: boolean | null; // null = 북마크 정보 없음(공개 목록 응답)
};

export type PolicyListFilters = {
  keyword?: string;
  categoryId?: number;
  regionId?: number;
  ageGroup?: AgeGroup; // personalized 소스에선 서버가 지원하지 않아 무시됨
  sort?: PolicySort; // personalized 소스에선 서버가 지원하지 않아 무시됨
};
