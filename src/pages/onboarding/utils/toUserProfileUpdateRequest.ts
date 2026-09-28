import { OCCUPATION_OPTIONS } from '@pages/onboarding/constants/occupations';
import type {
  HouseholdSpecial,
  HouseholdType,
  IncomeBracket,
  IncomeType,
  OnboardingAnswers,
  UserProfileUpdateRequest,
} from '@pages/onboarding/types/onboarding';

/**
 * 가구 답변 → 서버 householdType(하나).
 * 정책 데이터가 실제로 쓰는 조건(한부모·1인 가구)을 먼저 본다.
 * "해당 없음 + 가족과 함께 삶"은 대응 값이 없어 ELDERLY로 보낸다 — ELDERLY를 조건으로 쓰는 정책이 없어
 * 판정에 영향이 없고, 마이페이지에서는 만 65세 미만이면 표시하지 않는다.
 */
export const toHouseholdType = (
  householdSize: number,
  specials: HouseholdSpecial[]
): HouseholdType => {
  if (specials.includes('SINGLE_PARENT')) return 'SINGLE_PARENT';
  if (householdSize === 1) return 'SINGLE';
  if (specials.includes('DISABLED')) return 'DISABLED';
  return 'ELDERLY';
};

/**
 * 소득 구간 → 서버 소득 값.
 * "잘 모르겠어요"는 ABSOLUTE 0으로 보낸다 — 정책 소득 조건은 모두 중위소득 비율이라, 유형이 다르면
 * 서버가 "확인 필요"로 판정한다(모른다는 뜻을 그대로 전한다).
 */
export const toIncome = (
  bracket: IncomeBracket
): { incomeType: IncomeType; incomeValue: number } =>
  bracket === 'UNKNOWN'
    ? { incomeType: 'ABSOLUTE', incomeValue: 0 }
    : { incomeType: 'MEDIAN_PERCENTAGE', incomeValue: bracket };

export const toUserProfileUpdateRequest = (
  answers: OnboardingAnswers
): UserProfileUpdateRequest => {
  const occupation = OCCUPATION_OPTIONS.find(
    (option) => option.id === answers.occupation
  );
  if (
    !answers.birthDate ||
    !answers.gender ||
    answers.regionId === null ||
    !occupation ||
    answers.householdSize === null ||
    answers.incomeBracket === null
  ) {
    throw new Error('온보딩 답변이 모두 채워지지 않았습니다.');
  }

  return {
    birthDate: answers.birthDate,
    regionId: answers.regionId,
    gender: answers.gender,
    ...toIncome(answers.incomeBracket),
    employmentStatus: occupation.employmentStatus,
    householdType: toHouseholdType(
      answers.householdSize,
      answers.householdSpecials
    ),
  };
};
