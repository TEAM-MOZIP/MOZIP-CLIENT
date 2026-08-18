import type { InterestOption } from '@pages/onboarding/types/onboarding';
import employmentIcon from '@shared/assets/images/onboarding/employment.png';
import educationIcon from '@shared/assets/images/onboarding/education.png';
import housingIcon from '@shared/assets/images/onboarding/housing.png';
import financeIcon from '@shared/assets/images/onboarding/finance.png';
import healthcareIcon from '@shared/assets/images/onboarding/healthcare.png';
import cultureIcon from '@shared/assets/images/onboarding/culture.png';

export const INTEREST_OPTIONS: InterestOption[] = [
  { id: 'employment', label: '취업·창업', icon: employmentIcon },
  { id: 'education', label: '교육', icon: educationIcon },
  { id: 'housing', label: '주거', icon: housingIcon },
  { id: 'finance', label: '금융', icon: financeIcon },
  { id: 'healthcare', label: '의료', icon: healthcareIcon },
  { id: 'culture', label: '문화', icon: cultureIcon },
];
