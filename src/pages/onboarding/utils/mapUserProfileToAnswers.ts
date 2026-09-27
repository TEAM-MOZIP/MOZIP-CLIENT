import { ELDERLY_AGE } from '@pages/onboarding/constants/household';
import {
  INCOME_BRACKET_PERCENTS,
  OVER_TOP_BRACKET_PERCENT,
} from '@pages/onboarding/constants/medianIncome';
import type {
  HouseholdSpecial,
  IncomeBracket,
  OnboardingAnswers,
  Occupation,
} from '@pages/onboarding/types/onboarding';
import { getOnboardingInterests } from '@pages/onboarding/utils/onboardingInterestsStorage';
import { getAgeFromBirthDate } from '@pages/package/utils/getAgeGroup';
import type { GetMyProfileData } from '@shared/apis/generated/Api';

type Profile = GetMyProfileData | null | undefined;

// 서버 값으로 되살릴 수 있는 답만 채운다. 학생·직장인 구분, 2명 이상 가구원 수는 서버에 남지 않아
// 프로필 수정 때 다시 고르게 한다.
const toOccupation = (profile: Profile): Occupation | null =>
  profile?.employmentStatus === 'JOB_SEEKER' ? 'JOB_SEEKER' : null;

const toHouseholdSize = (profile: Profile): number | null =>
  profile?.householdType === 'SINGLE' ? 1 : null;

const toHouseholdSpecials = (profile: Profile): HouseholdSpecial[] => {
  switch (profile?.householdType) {
    case 'SINGLE_PARENT':
      return ['SINGLE_PARENT'];
    case 'DISABLED':
      return ['DISABLED'];
    case 'ELDERLY': {
      // 만 65세 미만의 ELDERLY는 "해당 없음" 대체값이다.
      const age = profile.birthDate
        ? getAgeFromBirthDate(profile.birthDate)
        : null;
      return age !== null && age >= ELDERLY_AGE ? ['ELDERLY'] : [];
    }
    default:
      return [];
  }
};

const toIncomeBracket = (profile: Profile): IncomeBracket | null => {
  if (profile?.incomeType === 'ABSOLUTE') {
    // 0은 "잘 모르겠어요". 예전 온보딩에서 실제 금액을 넣은 경우는 다시 고르게 한다.
    return profile.incomeValue === 0 ? 'UNKNOWN' : null;
  }
  if (
    profile?.incomeType !== 'MEDIAN_PERCENTAGE' ||
    profile.incomeValue == null
  ) {
    return null;
  }
  const value = profile.incomeValue;
  return (
    INCOME_BRACKET_PERCENTS.find((percent) => value <= percent) ??
    OVER_TOP_BRACKET_PERCENT
  );
};

export const mapUserProfileToAnswers = (
  profile: Profile
): OnboardingAnswers => ({
  birthDate: profile?.birthDate ?? null,
  gender: profile?.gender ?? null,
  regionId: profile?.regionId ?? null,
  occupation: toOccupation(profile),
  householdSize: toHouseholdSize(profile),
  householdSpecials: toHouseholdSpecials(profile),
  incomeBracket: toIncomeBracket(profile),
  interests: getOnboardingInterests(),
});
