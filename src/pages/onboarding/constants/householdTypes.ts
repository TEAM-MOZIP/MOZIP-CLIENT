import type { HouseholdType } from '@pages/onboarding/types/onboarding';

export const HOUSEHOLD_TYPE_OPTIONS: { id: HouseholdType; label: string }[] = [
  { id: 'SINGLE', label: '1인 가구' },
  { id: 'ELDERLY', label: '고령자 가구' },
  { id: 'SINGLE_PARENT', label: '한부모 가구' },
  { id: 'DISABLED', label: '장애인 가구' },
];
