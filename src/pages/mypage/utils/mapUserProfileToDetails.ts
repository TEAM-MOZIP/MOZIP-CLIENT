import { EMPLOYMENT_STATUS_OPTIONS } from '@pages/onboarding/constants/employmentStatuses';
import { GENDER_OPTIONS } from '@pages/onboarding/constants/genders';
import { ELDERLY_AGE } from '@pages/onboarding/constants/household';
import { HOUSEHOLD_TYPE_OPTIONS } from '@pages/onboarding/constants/householdTypes';
import { INTEREST_OPTIONS } from '@pages/onboarding/constants/interests';
import { getOnboardingInterests } from '@pages/onboarding/utils/onboardingInterestsStorage';
import type { ProfileDetailsData } from '@pages/mypage/types';
import type { GetMyProfileData } from '@shared/apis/generated/Api';

const getAgeFromBirthDate = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
};

const findLabel = <T extends string>(
  options: { id: T; label: string }[],
  id: T | undefined
) => options.find((option) => option.id === id)?.label;

export const mapUserProfileToDetails = (
  profile: GetMyProfileData | null | undefined
): ProfileDetailsData | null => {
  if (profile?.birthDate == null) return null;

  const interestIds = getOnboardingInterests();
  const age = getAgeFromBirthDate(profile.birthDate);
  // 온보딩에서 "해당 없음(가족과 함께 삶)"은 ELDERLY로 저장된다. 만 65세 미만이면 표시하지 않는다.
  const householdType =
    profile.householdType === 'ELDERLY' && age < ELDERLY_AGE
      ? undefined
      : profile.householdType;

  return {
    age,
    gender: findLabel(GENDER_OPTIONS, profile.gender) ?? '-',
    region: profile.regionName ?? '-',
    situations: [
      findLabel(EMPLOYMENT_STATUS_OPTIONS, profile.employmentStatus),
      findLabel(HOUSEHOLD_TYPE_OPTIONS, householdType),
    ].filter((label): label is string => Boolean(label)),
    interests: INTEREST_OPTIONS.filter((option) =>
      interestIds.includes(option.id)
    ),
  };
};
