import type { HouseholdSpecial } from '@pages/onboarding/types/onboarding';

// Q5 가구원 수(나 포함). 6은 "6명 이상"
export const MAX_HOUSEHOLD_SIZE = 6;

export const HOUSEHOLD_SIZE_OPTIONS: { value: number; label: string }[] = [
  { value: 1, label: '혼자 살아요' },
  { value: 2, label: '2명' },
  { value: 3, label: '3명' },
  { value: 4, label: '4명' },
  { value: 5, label: '5명' },
  { value: MAX_HOUSEHOLD_SIZE, label: '6명 이상' },
];

// Q6 해당 항목. 빈 선택은 "해당 없음"
export const HOUSEHOLD_SPECIAL_OPTIONS: {
  id: HouseholdSpecial;
  label: string;
}[] = [
  { id: 'SINGLE_PARENT', label: '한부모 가정이에요' },
  { id: 'DISABLED', label: '장애인 가족이 있어요' },
  { id: 'ELDERLY', label: '65세 이상 어르신이 있어요' },
];

export const NO_HOUSEHOLD_SPECIAL_LABEL = '해당 없음';

// 만 65세 이상이면 Q6에서 어르신 항목을 미리 골라 둔다.
export const ELDERLY_AGE = 65;
