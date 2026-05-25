import type {
  FilterGroup,
  PackageItem,
  PolicyItem,
} from '@pages/package/types';

export const PACKAGE_ITEMS: PackageItem[] = [
  {
    id: 'job-seeker',
    icon: '💼',
    title: '취업 준비생',
    description: '취업 준비에 필요한 지원 정책을 한곳에 모았어요.',
    policyCount: 10,
  },
  {
    id: 'solo-youth',
    icon: '🏠',
    title: '자취 청년',
    description: '주거·생활비 지원 등 자취생을 위한 혜택을 확인해 보세요.',
    policyCount: 10,
  },
  {
    id: 'university',
    icon: '🎓',
    title: '대학 생활',
    description: '장학금, 교육비, 생활 지원 등 대학생 맞춤 정책이에요.',
    policyCount: 10,
  },
  {
    id: 'early-career',
    icon: '🌱',
    title: '사회 초년생',
    description: '첫 직장·사회 진입을 위한 정책 패키지입니다.',
    policyCount: 10,
  },
];

export const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'status',
    title: '상태',
    options: [
      { id: 'open', label: '접수 중', statusDot: 'green' },
      { id: 'closing', label: '마감 임박', statusDot: 'red' },
      { id: 'scheduled', label: '예정', statusDot: 'blue' },
    ],
  },
  {
    id: 'age',
    title: '연령',
    options: [
      { id: 'all', label: '전체' },
      { id: '19-24', label: '만 19~24세' },
      { id: '25-29', label: '만 25~29세' },
      { id: '30-34', label: '만 30~34세' },
    ],
  },
  {
    id: 'category',
    title: '카테고리',
    options: [
      { id: 'all', label: '전체' },
      { id: 'housing', label: '주거' },
      { id: 'employment', label: '취업' },
      { id: 'education', label: '교육' },
      { id: 'welfare', label: '복지' },
    ],
  },
  {
    id: 'region',
    title: '지역',
    options: [
      { id: 'gangnam', label: '강남구' },
      { id: 'gangdong', label: '강동구' },
      { id: 'gangbuk', label: '강북구' },
      { id: 'gangseo', label: '강서구' },
      { id: 'gwanak', label: '관악구' },
      { id: 'gwangjin', label: '광진구' },
      { id: 'guro', label: '구로구' },
      { id: 'nowon', label: '노원구' },
      { id: 'dobong', label: '도봉구' },
      { id: 'dongdaemun', label: '동대문구' },
    ],
  },
];

export const POLICY_ITEMS: PolicyItem[] = [
  {
    id: '1',
    tags: ['만 19~24세', '주거', '강남구'],
    title: '청년 월세 특별지원',
    dDay: 14,
    organization: '서울특별시',
    period: '2026. 05. 20. 오전 09:00 ~ 2026. 06. 30. 오후 06:00',
    bookmarked: true,
  },
  {
    id: '2',
    tags: ['만 25~29세', '취업', '강남구'],
    title: '청년 구직활동 지원금',
    dDay: 7,
    organization: '고용노동부',
    period: '2026. 05. 15. 오전 10:00 ~ 2026. 06. 15. 오후 05:00',
  },
  {
    id: '3',
    tags: ['만 19~24세', '교육', '관악구'],
    title: '대학생 학습 장려금',
    dDay: 21,
    organization: '교육부',
    period: '2026. 05. 01. 오전 09:00 ~ 2026. 07. 31. 오후 06:00',
  },
  {
    id: '4',
    tags: ['만 30~34세', '복지', '노원구'],
    title: '청년 문화패스 지원',
    dDay: 3,
    organization: '문화체육관광부',
    period: '2026. 05. 10. 오전 09:00 ~ 2026. 05. 25. 오후 11:59',
  },
  {
    id: '5',
    tags: ['만 25~29세', '주거', '마포구'],
    title: '청년 전세자금 대출 이자 지원',
    dDay: 30,
    organization: '서울주택도시공사',
    period: '2026. 04. 01. 오전 09:00 ~ 2026. 08. 31. 오후 06:00',
  },
  {
    id: '6',
    tags: ['만 19~24세', '취업', '성동구'],
    title: '청년 인턴십 참여 지원',
    dDay: 12,
    organization: '서울특별시',
    period: '2026. 05. 18. 오전 09:00 ~ 2026. 06. 20. 오후 06:00',
  },
];

export const TOTAL_POLICY_COUNT = 1320;
