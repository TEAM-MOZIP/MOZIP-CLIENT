import type {
  RegionResponse,
  UserProfileResponse,
  UserProfileUpdateRequest,
} from '@shared/apis/generated/Api';

export type { RegionResponse, UserProfileResponse, UserProfileUpdateRequest };

// swagger-typescript-api가 UserProfileUpdateRequest 필드에 리터럴 유니온을
// 인라인으로 박아두고 별도 이름으로 뽑아주진 않아서, 여기서 한 번만 파생시켜
// 재사용한다. 서버 enum이 바뀌면 스펙 재생성만으로 자동 반영된다.
export type Gender = NonNullable<UserProfileUpdateRequest['gender']>;
export type IncomeType = NonNullable<UserProfileUpdateRequest['incomeType']>;
export type EmploymentStatus = NonNullable<
  UserProfileUpdateRequest['employmentStatus']
>;
export type HouseholdType = NonNullable<
  UserProfileUpdateRequest['householdType']
>;

// 온보딩 단계
export const ONBOARDING_STEP = {
  intro: 0,
  birthDate: 1,
  gender: 2,
  residence: 3,
  employmentStatus: 4,
  householdType: 5,
  income: 6,
  interest: 7,
} as const;

export type OnboardingStep =
  (typeof ONBOARDING_STEP)[keyof typeof ONBOARDING_STEP];

export type QuestionStep = Exclude<
  OnboardingStep,
  typeof ONBOARDING_STEP.intro
>;

// 관심 분야(Q7) — 서버 프로필 스키마엔 대응 필드가 없어 로컬 저장 전용
export type InterestOption = {
  id: string;
  label: string;
  icon: string;
};

// 온보딩 답변 — PUT /api/users/me/profile 제출용 필드 + interests(로컬 전용)
export type OnboardingAnswers = {
  birthDate: string | null; // 'YYYY-MM-DD'
  gender: Gender | null;
  regionId: number | null;
  employmentStatus: EmploymentStatus | null;
  householdType: HouseholdType | null;
  incomeType: IncomeType | null;
  incomeValue: number | null;
  interests: string[];
};
