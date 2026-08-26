import type {
  ProfileDetailsData,
  ProfileInfoData,
  ScheduleItem,
} from '@pages/mypage/types';
import type { PolicyItem } from '@pages/package/types';
import { POLICY_ITEMS } from '@pages/package/constants/mockData';
import employmentIcon from '@shared/assets/images/onboarding/employment.png';
import educationIcon from '@shared/assets/images/onboarding/education.png';
import housingIcon from '@shared/assets/images/onboarding/housing.png';

export const MOCK_PROFILE_INFO: ProfileInfoData = {
  name: '나문희',
  nickname: '닉네임',
  email: 'nmh@mozip.com',
};

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

export const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    id: 's1',
    title: '청년 월세 특별지원',
    startLabel: '8/1 09:00',
    endLabel: '8/31 18:00',
    date: '2026-08-21',
    status: 'open',
  },
  {
    id: 's2',
    title: '자격증 교육비 지원',
    startLabel: '8/20 09:00',
    endLabel: '8/27 18:00',
    date: '2026-08-27',
    status: 'closing',
  },
  {
    id: 's3',
    title: '대학생 장학금',
    startLabel: '9/1 09:00',
    endLabel: '9/30 18:00',
    date: '2026-08-31',
    status: 'scheduled',
  },
];

export const MOCK_BOOKMARKS: PolicyItem[] = Array.from(
  { length: 6 },
  (_, i) => {
    const base =
      POLICY_ITEMS.find((p) => p.title === '청년 월세 특별지원') ??
      POLICY_ITEMS[0]!;

    return {
      ...base,
      id: `bookmark-${i + 1}`,
      age: '만 19~24세',
      category: '주거',
      region: '강남구',
      title: '청년 월세 특별지원',
      dDay: 14,
      bookmarked: true,
    };
  }
);
