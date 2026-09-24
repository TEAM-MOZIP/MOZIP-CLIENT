import type { OnboardingAnswers } from '@pages/onboarding/types/onboarding';
import { getOnboardingInterests } from '@pages/onboarding/utils/onboardingInterestsStorage';
import type { GetMyProfileData } from '@shared/apis/generated/Api';

export const mapUserProfileToAnswers = (
  profile: GetMyProfileData | null | undefined
): OnboardingAnswers => ({
  birthDate: profile?.birthDate ?? null,
  gender: profile?.gender ?? null,
  regionId: profile?.regionId ?? null,
  employmentStatus: profile?.employmentStatus ?? null,
  householdType: profile?.householdType ?? null,
  incomeType: profile?.incomeType ?? null,
  incomeValue: profile?.incomeValue ?? null,
  interests: getOnboardingInterests(),
});
