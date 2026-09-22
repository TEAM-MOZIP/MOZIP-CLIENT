import type {
  OnboardingAnswers,
  UserProfileUpdateRequest,
} from '@pages/onboarding/types/onboarding';

export const toUserProfileUpdateRequest = (
  answers: OnboardingAnswers
): UserProfileUpdateRequest => {
  if (
    !answers.birthDate ||
    !answers.gender ||
    answers.regionId === null ||
    !answers.employmentStatus ||
    !answers.householdType ||
    !answers.incomeType ||
    answers.incomeValue === null
  ) {
    throw new Error('온보딩 답변이 모두 채워지지 않았습니다.');
  }

  return {
    birthDate: answers.birthDate,
    regionId: answers.regionId,
    gender: answers.gender,
    incomeType: answers.incomeType,
    incomeValue: answers.incomeValue,
    employmentStatus: answers.employmentStatus,
    householdType: answers.householdType,
  };
};
