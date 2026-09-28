import type { EmploymentStatus } from '@pages/onboarding/types/onboarding';

export const EMPLOYMENT_STATUS_OPTIONS: {
  id: EmploymentStatus;
  label: string;
}[] = [
  { id: 'EMPLOYED', label: '재직 중' },
  { id: 'JOB_SEEKER', label: '구직 중' },
  { id: 'UNEMPLOYED', label: '미취업' },
];
