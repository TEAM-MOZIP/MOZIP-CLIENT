import type { ProfileDetailsData } from '@pages/mypage/types';
import employmentIcon from '@shared/assets/images/onboarding/employment.png';
import educationIcon from '@shared/assets/images/onboarding/education.png';
import housingIcon from '@shared/assets/images/onboarding/housing.png';

export const MOCK_PROFILE_DETAILS: ProfileDetailsData = {
  age: 25,
  gender: '여성',
  region: '서울 용산구',
  situations: ['대학생', '취업 준비생', '1인 가구'],
  interests: [
    { id: 'employment', label: '취업 · 창업', icon: employmentIcon },
    { id: 'education', label: '교육', icon: educationIcon },
    { id: 'housing', label: '주거', icon: housingIcon },
  ],
};
