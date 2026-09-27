import {
  ONBOARDING_STEP,
  type QuestionStep,
} from '@pages/onboarding/types/onboarding';

export const TOTAL_QUESTION_STEPS = 8;
export const LAST_QUESTION_STEP = ONBOARDING_STEP.interest;
export const QUESTION_STEPS: QuestionStep[] = [
  ONBOARDING_STEP.birthDate,
  ONBOARDING_STEP.gender,
  ONBOARDING_STEP.residence,
  ONBOARDING_STEP.occupation,
  ONBOARDING_STEP.householdSize,
  ONBOARDING_STEP.householdSpecial,
  ONBOARDING_STEP.income,
  ONBOARDING_STEP.interest,
];

// 출생연도 선택 UI(BirthDateStep)의 최솟값
export const MIN_BIRTH_YEAR = 1930;

// 왼쪽 사이드바의 단계 이름
export const STEP_NAMES: Record<QuestionStep, string> = {
  [ONBOARDING_STEP.birthDate]: '생년월일',
  [ONBOARDING_STEP.gender]: '성별',
  [ONBOARDING_STEP.residence]: '거주지',
  [ONBOARDING_STEP.occupation]: '하는 일',
  [ONBOARDING_STEP.householdSize]: '함께 사는 사람',
  [ONBOARDING_STEP.householdSpecial]: '가구 특성',
  [ONBOARDING_STEP.income]: '소득',
  [ONBOARDING_STEP.interest]: '관심 분야',
};

export const QUESTION_TITLES: Record<QuestionStep, string> = {
  [ONBOARDING_STEP.birthDate]: '생년월일을 알려주세요',
  [ONBOARDING_STEP.gender]: '성별을 알려주세요',
  [ONBOARDING_STEP.residence]: '어디에 살고 계신가요?',
  [ONBOARDING_STEP.occupation]: '요즘 무엇을 하고 계세요?',
  [ONBOARDING_STEP.householdSize]: '나를 포함해 몇 명이 함께 살고 있나요?',
  [ONBOARDING_STEP.householdSpecial]: '해당하는 게 있다면 골라주세요',
  [ONBOARDING_STEP.income]: '한 달 소득은 어느 정도인가요?',
  [ONBOARDING_STEP.interest]: '어떤 분야의 혜택이 궁금하세요?',
};

export const QUESTION_DESCRIPTIONS: Record<QuestionStep, string> = {
  [ONBOARDING_STEP.birthDate]: '나이 조건이 있는 정책을 정확하게 골라드려요.',
  [ONBOARDING_STEP.gender]: '성별 조건이 있는 정책을 걸러낼 때만 써요.',
  [ONBOARDING_STEP.residence]:
    '사는 곳에서 받을 수 있는 지역 정책을 찾아드려요.',
  [ONBOARDING_STEP.occupation]: '가장 가까운 걸 하나 골라주세요.',
  [ONBOARDING_STEP.householdSize]:
    '자취·기숙사에서 혼자 지낸다면 "혼자 살아요"를 골라주세요.',
  [ONBOARDING_STEP.householdSpecial]:
    '여러 개 골라도 돼요. 없다면 그대로 넘어가세요.',
  [ONBOARDING_STEP.income]: '세금 떼기 전 금액 기준이에요.',
  [ONBOARDING_STEP.interest]: '여러 개 골라도 돼요. 추천 순서에 반영할게요.',
};
