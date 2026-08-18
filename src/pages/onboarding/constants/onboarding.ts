import { ONBOARDING_STEP } from '@pages/onboarding/types/onboarding';

export const TOTAL_QUESTION_STEPS = 5;
export const LAST_QUESTION_STEP = ONBOARDING_STEP.interest;

export const DEFAULT_AGE = 25;
export const MIN_AGE = 1;
export const MAX_AGE = 100;

export const QUESTION_TITLES = {
  [ONBOARDING_STEP.age]: '1. 나이를 알려주세요.',
  [ONBOARDING_STEP.gender]: '2. 성별을 알려주세요.',
  [ONBOARDING_STEP.residence]: '3. 어디에 거주하고 계신가요?',
  [ONBOARDING_STEP.situation]: '4. 현재 어떤 상황에 해당되시나요?',
  [ONBOARDING_STEP.interest]: '5. 어떤 분야의 혜택에 관심이 있으신가요?',
} as const;
