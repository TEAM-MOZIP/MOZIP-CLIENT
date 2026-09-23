import { EMPLOYMENT_STATUS_OPTIONS } from '@pages/onboarding/constants/employmentStatuses';
import { GENDER_OPTIONS } from '@pages/onboarding/constants/genders';
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

  return {
    age: getAgeFromBirthDate(profile.birthDate),
    gender: findLabel(GENDER_OPTIONS, profile.gender) ?? '-',
    region: profile.regionName ?? '-',
    situations: [
      findLabel(EMPLOYMENT_STATUS_OPTIONS, profile.employmentStatus),
      findLabel(HOUSEHOLD_TYPE_OPTIONS, profile.householdType),
    ].filter((label): label is string => Boolean(label)),
    interests: INTEREST_OPTIONS.filter((option) =>
      interestIds.includes(option.id)
    ),
  };
};
