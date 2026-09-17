import type { IncomeType } from '@pages/onboarding/types/onboarding';

export const INCOME_TYPE_OPTIONS: {
  id: IncomeType;
  label: string;
  unit: string;
}[] = [
  { id: 'ABSOLUTE', label: '연 소득 금액', unit: '만원' },
  { id: 'MEDIAN_PERCENTAGE', label: '기준 중위소득 대비 비율', unit: '%' },
];
