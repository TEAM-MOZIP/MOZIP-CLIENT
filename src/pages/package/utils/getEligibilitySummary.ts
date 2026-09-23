import type { PolicyEligibilityResponse } from '@pages/package/types/package';
import { EMPTY_VALUE } from '@shared/utils/displayValue';

const EMPLOYMENT_STATUS_LABELS: Record<string, string> = {
  EMPLOYED: '재직 중',
  UNEMPLOYED: '미취업',
  JOB_SEEKER: '구직 중',
};

const HOUSEHOLD_TYPE_LABELS: Record<string, string> = {
  SINGLE: '1인 가구',
  ELDERLY: '고령자 가구',
  SINGLE_PARENT: '한부모 가구',
  DISABLED: '장애인 가구',
};

// 서버는 값이 없는 필드를 null로 내려주므로 undefined뿐 아니라 null도 "없음"으로 본다.
const hasValue = (value?: number | null): value is number => value != null;

const formatAgeRange = (min?: number | null, max?: number | null) => {
  if (hasValue(min) && hasValue(max)) return `만 ${min}~${max}세`;
  if (hasValue(min)) return `만 ${min}세 이상`;
  if (hasValue(max)) return `만 ${max}세 이하`;
  return null;
};

const formatIncome = (eligibility: PolicyEligibilityResponse) => {
  const { incomeType, minimumIncomeValue, maximumIncomeValue } = eligibility;
  if (!incomeType) return null;

  const unit = incomeType === 'MEDIAN_PERCENTAGE' ? '%' : '만원';
  const label = incomeType === 'MEDIAN_PERCENTAGE' ? '기준 중위소득' : '연소득';

  if (hasValue(minimumIncomeValue) && hasValue(maximumIncomeValue)) {
    return `${label} ${minimumIncomeValue}~${maximumIncomeValue}${unit}`;
  }
  if (hasValue(maximumIncomeValue))
    return `${label} ${maximumIncomeValue}${unit} 이하`;
  if (hasValue(minimumIncomeValue))
    return `${label} ${minimumIncomeValue}${unit} 이상`;
  return null;
};

// PolicyEligibilityResponse는 구조화된 조건 객체(배열이 아님)라, 사람이 읽는
// 문장 목록으로 조합해서 보여준다. additionalConditions(자유 형식 key-value)는
// 스키마를 알 수 없어 렌더링하지 않는다 — 필요해지면 서버와 형식 협의 후 추가.
export const getEligibilitySummary = (
  eligibility: PolicyEligibilityResponse | null
): string[] => {
  if (!eligibility) return [EMPTY_VALUE];

  const lines: string[] = [];

  const ageRange = formatAgeRange(
    eligibility.minimumAge,
    eligibility.maximumAge
  );
  if (ageRange) lines.push(ageRange);

  if (eligibility.genderCondition) {
    lines.push(
      eligibility.genderCondition === 'MALE' ? '남성만 해당' : '여성만 해당'
    );
  }

  const income = formatIncome(eligibility);
  if (income) lines.push(income);

  if (eligibility.allowedEmploymentStatuses?.length) {
    lines.push(
      `${eligibility.allowedEmploymentStatuses
        .map((status) => EMPLOYMENT_STATUS_LABELS[status] ?? status)
        .join(' 또는 ')} 대상`
    );
  }

  if (eligibility.allowedHouseholdTypes?.length) {
    lines.push(
      `${eligibility.allowedHouseholdTypes
        .map((type) => HOUSEHOLD_TYPE_LABELS[type] ?? type)
        .join(' 또는 ')} 대상`
    );
  }

  return lines.length > 0 ? lines : ['별도 자격 제한이 없어요.'];
};
