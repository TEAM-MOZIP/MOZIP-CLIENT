import { ONBOARDING_STEP } from '@pages/onboarding/types/onboarding';

export const TOTAL_QUESTION_STEPS = 7;
export const LAST_QUESTION_STEP = ONBOARDING_STEP.interest;

// 출생연도 선택 UI(BirthDateStep)의 최솟값
export const MIN_BIRTH_YEAR = 1930;

export const QUESTION_TITLES = {
  [ONBOARDING_STEP.birthDate]: '1. 생년월일을 알려주세요.',
  [ONBOARDING_STEP.gender]: '2. 성별을 알려주세요.',
  [ONBOARDING_STEP.residence]: '3. 어디에 거주하고 계신가요?',
  [ONBOARDING_STEP.employmentStatus]: '4. 현재 취업 상태를 알려주세요.',
  [ONBOARDING_STEP.householdType]: '5. 가구 형태를 알려주세요.',
  [ONBOARDING_STEP.income]: '6. 소득 수준을 알려주세요.',
  [ONBOARDING_STEP.interest]: '7. 어떤 분야의 혜택에 관심이 있으신가요?',
} as const;
