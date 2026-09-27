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
  occupation: 4,
  householdSize: 5,
  householdSpecial: 6,
  income: 7,
  interest: 8,
} as const;

export type OnboardingStep =
  (typeof ONBOARDING_STEP)[keyof typeof ONBOARDING_STEP];

export type QuestionStep = Exclude<
  OnboardingStep,
  typeof ONBOARDING_STEP.intro
>;

// 관심 분야(Q8) — 서버 프로필 스키마엔 대응 필드가 없어 로컬 저장 전용
export type InterestOption = {
  id: string;
  label: string;
  icon: string;
};

// Q4 "요즘 무엇을 하고 계세요?" — 서버 employmentStatus(3종)로 바꿔서 보낸다.
export type Occupation =
  | 'STUDENT'
  | 'OFFICE_WORKER'
  | 'SELF_EMPLOYED'
  | 'JOB_SEEKER'
  | 'RESTING'
  | 'OTHER';

// Q6 "해당하는 게 있다면" — 빈 배열이면 "해당 없음"
export type HouseholdSpecial = 'SINGLE_PARENT' | 'DISABLED' | 'ELDERLY';

// Q7 소득 구간 — 기준 중위소득 대비 비율 구간의 윗값(200% 초과는 250). 모르면 'UNKNOWN'
export type IncomeBracket = 50 | 75 | 100 | 200 | 250 | 'UNKNOWN';

// 온보딩 답변 — 제출할 때 toUserProfileUpdateRequest가 서버 7개 필드로 바꾼다.
export type OnboardingAnswers = {
  birthDate: string | null; // 'YYYY-MM-DD'
  gender: Gender | null;
  regionId: number | null;
  occupation: Occupation | null;
  householdSize: number | null; // 나 포함 가구원 수, 6은 "6명 이상"
  householdSpecials: HouseholdSpecial[];
  incomeBracket: IncomeBracket | null;
  interests: string[];
};
