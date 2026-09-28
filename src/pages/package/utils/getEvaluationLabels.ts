import type { ConditionResult } from '@pages/package/types/package';

export type EligibilityStatusTone = 'eligible' | 'ineligible' | 'review';

export const ELIGIBILITY_STATUS_LABELS: Record<
  'ELIGIBLE' | 'INELIGIBLE' | 'NEEDS_REVIEW',
  { label: string; tone: EligibilityStatusTone }
> = {
  ELIGIBLE: { label: '적격', tone: 'eligible' },
  INELIGIBLE: { label: '부적격', tone: 'ineligible' },
  NEEDS_REVIEW: { label: '확인 필요', tone: 'review' },
};

const CONDITION_TYPE_LABELS: Record<
  NonNullable<ConditionResult['type']>,
  string
> = {
  AGE: '연령',
  REGION: '지역',
  INCOME: '소득',
  EMPLOYMENT_STATUS: '취업상태',
  HOUSEHOLD_TYPE: '가구형태',
  GENDER: '성별',
  ADDITIONAL_CONDITIONS: '기타 조건',
};

const CONDITION_STATUS_LABELS: Record<
  NonNullable<ConditionResult['status']>,
  string
> = {
  MATCHED: '충족',
  NOT_MATCHED: '불충족',
  NEEDS_REVIEW: '확인 필요',
};

export const getConditionTypeLabel = (type: ConditionResult['type']) =>
  type ? (CONDITION_TYPE_LABELS[type] ?? type) : '조건';

export const getConditionStatusLabel = (status: ConditionResult['status']) =>
  status ? (CONDITION_STATUS_LABELS[status] ?? status) : '확인 필요';
