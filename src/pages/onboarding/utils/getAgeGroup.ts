import type { AgeGroup } from '@pages/onboarding/types/onboarding';

export const getAgeGroup = (age: number): AgeGroup => {
  if (age < 20) return 'teens';
  if (age < 40) return 'twentiesThirties';
  if (age < 60) return 'fortiesFifties';
  return 'sixtiesPlus';
};
