// 온보딩 단계
export const ONBOARDING_STEP = {
  intro: 0,
  age: 1,
  gender: 2,
  residence: 3,
  situation: 4,
  interest: 5,
} as const;

export type OnboardingStep =
  (typeof ONBOARDING_STEP)[keyof typeof ONBOARDING_STEP];

export type QuestionStep = Exclude<
  OnboardingStep,
  typeof ONBOARDING_STEP.intro
>;

// 연령(Q1)
export const AGE_GROUPS = [
  'teens',
  'twentiesThirties',
  'fortiesFifties',
  'sixtiesPlus',
] as const;

export type AgeGroup = (typeof AGE_GROUPS)[number];

// 성별(Q2)
export type Gender = 'female' | 'male';

// 상황(Q4)
export type SituationOption = {
  id: string;
  label: string;
};

export type SituationCategory = {
  id: string;
  label: string;
  options: SituationOption[];
};

// 관심 분야(Q5)
export type InterestOption = {
  id: string;
  label: string;
  icon: string;
};

// 온보딩 답변
export type OnboardingAnswers = {
  age: number;
  gender: Gender | null;
  district: string | null;
  situations: string[];
  interests: string[];
};
