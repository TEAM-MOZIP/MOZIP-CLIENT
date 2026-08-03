import type {
  FilterGroup,
  FilterStatusDot,
  PackageItem,
  PolicyItem,
} from '@pages/package/types';
import {
  POLICY_STATUSES,
  POLICY_AGES,
  POLICY_CATEGORIES,
  POLICY_REGIONS,
} from '@pages/package/types';
import emojiBag from '@shared/assets/images/package/emoji-1-bag.png';
import emojiHouse from '@shared/assets/images/package/emoji-2-house.png';
import emojiEdu from '@shared/assets/images/package/emoji-3-edu.png';
import emojiSprout from '@shared/assets/images/package/emoji-4-sprout.png';

export const PACKAGE_ITEMS: PackageItem[] = [
  {
    id: 'job-seeker',
    icon: emojiBag,
    title: '취업 준비생',
    description: '이력서 지원부터 면접비, 취업 장려금까지 한 번에 알아보세요.',
    policyCount: 42,
  },
  {
    id: 'solo-youth',
    icon: emojiHouse,
    title: '자취 청년',
    description:
      '월세 · 전세 지원부터 공공임대 입주 정보, 공과금, 생활비까지 한 번에 알아보세요.',
    policyCount: 38,
  },
  {
    id: 'university',
    icon: emojiEdu,
    title: '대학생',
    description:
      '장학금, 각종 교육비 · 자격증 비용, 생활 지원 정책 모음입니다.',
    policyCount: 35,
  },
  {
    id: 'early-career',
    icon: emojiSprout,
    title: '사회 초년생',
    description: '첫 직장 적응을 돕는 복지, 저축, 경력 지원 정책 모음입니다.',
    policyCount: 40,
  },
];

const STATUS_OPTION_IDS = ['all', 'open', 'closing', 'scheduled'] as const;
const STATUS_DOTS: Record<string, FilterStatusDot | undefined> = {
  open: 'green',
  closing: 'red',
  scheduled: 'blue',
};
const AGE_OPTION_IDS = ['all', '19-24', '25-29', '30-34', '60+'] as const;
const CATEGORY_OPTION_IDS = [
  'all',
  'employment',
  'education',
  'housing',
  'finance',
  'medical',
  'culture',
] as const;
const REGION_OPTION_IDS = [
  'all',
  'gangnam',
  'gangdong',
  'gangbuk',
  'gangseo',
  'gwanak',
  'gwangjin',
  'guro',
  'geumcheon',
  'nowon',
  'dobong',
  'dongdaemun',
  'dongjak',
  'mapo',
  'seodaemun',
  'seocho',
  'seongdong',
  'seongbuk',
  'songpa',
  'yangcheon',
  'yeongdeungpo',
  'yongsan',
  'eunpyeong',
  'jongno',
  'jung',
  'jungnang',
] as const;

export const FILTER_GROUPS: FilterGroup[] = [
  {
    id: 'status',
    title: '상태',
    options: POLICY_STATUSES.map((label, index) => {
      const id = STATUS_OPTION_IDS[index];
      return {
        id,
        label,
        statusDot: STATUS_DOTS[id],
      };
    }),
  },
  {
    id: 'age',
    title: '연령',
    options: POLICY_AGES.map((label, index) => ({
      id: AGE_OPTION_IDS[index],
      label,
    })),
  },
  {
    id: 'category',
    title: '카테고리',
    options: POLICY_CATEGORIES.map((label, index) => ({
      id: CATEGORY_OPTION_IDS[index],
      label,
    })),
  },
  {
    id: 'region',
    title: '지역',
    options: POLICY_REGIONS.map((label, index) => ({
      id: REGION_OPTION_IDS[index],
      label,
    })),
  },
];

type PolicyItemBase = Omit<
  PolicyItem,
  | 'introduction'
  | 'supportContents'
  | 'eligibility'
  | 'documents'
  | 'notes'
  | 'contactName'
  | 'contactPhone'
>;

const POLICY_ITEMS_BASE: PolicyItemBase[] = [
  {
    id: '1',
    age: '전체',
    category: '주거',
    region: '전체',
    title: '기초생활보장 생계급여',
    dDay: 14,
    organization: '보건복지부',
    period: '2026. 01. 01. 오전 09:00 ~ 2026. 12. 31. 오후 06:00',
    bookmarked: true,
  },
  {
    id: '2',
    age: '만 25~29세',
    category: '취업·창업',
    region: '전체',
    title: '구직활동 지원금',
    dDay: 7,
    organization: '고용노동부',
    period: '2026. 05. 15. 오전 10:00 ~ 2026. 06. 15. 오후 05:00',
    bookmarked: true,
  },
  {
    id: '3',
    age: '전체',
    category: '교육',
    region: '강남구',
    title: '아이돌봄 서비스 바우처',
    dDay: 21,
    organization: '서울특별시',
    period: '2026. 05. 01. 오전 09:00 ~ 2026. 07. 31. 오후 06:00',
  },
  {
    id: '4',
    age: '60대 이상',
    category: '취업·창업',
    region: '노원구',
    title: '노인 일자리 사업 참여',
    dDay: 3,
    organization: '서울특별시',
    period: '2026. 05. 10. 오전 09:00 ~ 2026. 05. 25. 오후 11:59',
  },
  {
    id: '5',
    age: '전체',
    category: '금융',
    region: '전체',
    title: '소상공인 경영안정 자금 융자',
    dDay: 30,
    organization: '중소벤처기업부',
    period: '2026. 04. 01. 오전 09:00 ~ 2026. 08. 31. 오후 06:00',
  },
  {
    id: '6',
    age: '만 19~24세',
    category: '교육',
    region: '관악구',
    title: '대학생 학습 장려금',
    dDay: 12,
    organization: '교육부',
    period: '2026. 05. 18. 오전 09:00 ~ 2026. 06. 20. 오후 06:00',
  },
  {
    id: '7',
    age: '전체',
    category: '의료',
    region: '전체',
    title: '장애인 활동지원 서비스',
    dDay: 18,
    organization: '보건복지부',
    period: '2026. 05. 12. 오전 09:00 ~ 2026. 07. 15. 오후 06:00',
  },
  {
    id: '8',
    age: '전체',
    category: '의료',
    region: '마포구',
    title: '출산·양육 일시지원금',
    dDay: 25,
    organization: '보건복지부',
    period: '2026. 04. 15. 오전 09:00 ~ 2026. 09. 30. 오후 06:00',
    bookmarked: true,
  },
  {
    id: '9',
    age: '만 30~34세',
    category: '취업·창업',
    region: '구로구',
    title: '경력 전환 직업훈련 지원',
    dDay: 9,
    organization: '고용노동부',
    period: '2026. 05. 08. 오전 10:00 ~ 2026. 06. 08. 오후 05:00',
  },
  {
    id: '10',
    age: '전체',
    category: '주거',
    region: '동대문구',
    title: '주거급여 및 주거비 지원',
    dDay: 16,
    organization: '국토교통부',
    period: '2026. 05. 01. 오전 09:00 ~ 2026. 08. 31. 오후 06:00',
  },
  {
    id: '11',
    age: '전체',
    category: '교육',
    region: '전체',
    title: '평생학습 바우처',
    dDay: 22,
    organization: '교육부',
    period: '2026. 05. 05. 오전 09:00 ~ 2026. 07. 20. 오후 06:00',
  },
  {
    id: '12',
    age: '전체',
    category: '문화',
    region: '강북구',
    title: '다문화가족 통·번역 서비스',
    dDay: 5,
    organization: '법무부',
    period: '2026. 05. 20. 오전 09:00 ~ 2026. 06. 10. 오후 06:00',
  },
  {
    id: '13',
    age: '만 19~24세',
    category: '주거',
    region: '강남구',
    title: '청년 월세 특별지원',
    dDay: 28,
    organization: '강남구청 청년정책과',
    period: '2026.07.01 ~ 2026.08.18',
  },
  {
    id: '14',
    age: '전체',
    category: '주거',
    region: '전체',
    title: '신혼부부 전세자금 대출',
    dDay: 11,
    organization: 'LH한국토지주택공사',
    period: '2026. 05. 10. 오전 09:00 ~ 2026. 06. 25. 오후 06:00',
  },
  {
    id: '15',
    age: '전체',
    category: '금융',
    region: '강동구',
    title: '농어업인 수당 및 재해 지원',
    dDay: 8,
    organization: '농림축산식품부',
    period: '2026. 05. 16. 오전 09:00 ~ 2026. 06. 16. 오후 06:00',
  },
  {
    id: '16',
    age: '만 19~24세',
    category: '취업·창업',
    region: '광진구',
    title: '인턴십 참여 지원',
    dDay: 19,
    organization: '서울특별시',
    period: '2026. 05. 03. 오전 09:00 ~ 2026. 07. 10. 오후 06:00',
    bookmarked: true,
  },
  {
    id: '17',
    age: '전체',
    category: '금융',
    region: '전체',
    title: '에너지 바우처 (전기·가스)',
    dDay: 35,
    organization: '산업통상자원부',
    period: '2026. 03. 01. 오전 09:00 ~ 2026. 12. 31. 오후 06:00',
  },
  {
    id: '18',
    age: '전체',
    category: '취업·창업',
    region: '전체',
    title: '소득 감소 소상공인 버팀목',
    dDay: 6,
    organization: '서울특별시',
    period: '2026. 05. 22. 오전 10:00 ~ 2026. 06. 05. 오후 05:00',
  },
  {
    id: '19',
    age: '전체',
    category: '의료',
    region: '성동구',
    title: '긴급복지 생계·의료 지원',
    dDay: 13,
    organization: '보건복지부',
    period: '2026. 05. 08. 오전 09:00 ~ 2026. 06. 30. 오후 06:00',
  },
  {
    id: '20',
    age: '전체',
    category: '교육',
    region: '전체',
    title: '중장년 내일센터 직업교육',
    dDay: 24,
    organization: '고용노동부',
    period: '2026. 04. 20. 오전 09:00 ~ 2026. 08. 20. 오후 06:00',
  },
  {
    id: '21',
    age: '전체',
    category: '주거',
    region: '도봉구',
    title: '공공임대주택 입주자 모집',
    dDay: 17,
    organization: '서울주택도시공사',
    period: '2026. 05. 06. 오전 09:00 ~ 2026. 07. 06. 오후 06:00',
  },
  {
    id: '22',
    age: '전체',
    category: '의료',
    region: '전체',
    title: '국가유공자 의료비 지원',
    dDay: 27,
    organization: '국가보훈부',
    period: '2026. 04. 10. 오전 09:00 ~ 2026. 09. 15. 오후 06:00',
  },
  {
    id: '23',
    age: '전체',
    category: '문화',
    region: '전체',
    title: '문화누리카드 발급',
    dDay: 4,
    organization: '문화체육관광부',
    period: '2026. 05. 18. 오전 09:00 ~ 2026. 05. 28. 오후 11:59',
  },
  {
    id: '24',
    age: '만 25~29세',
    category: '취업·창업',
    region: '강남구',
    title: '면접 정장 대여·구매 지원',
    dDay: 10,
    organization: '서울특별시',
    period: '2026. 05. 14. 오전 09:00 ~ 2026. 06. 14. 오후 06:00',
  },
  {
    id: '25',
    age: '전체',
    category: '금융',
    region: '노원구',
    title: '한부모가족 아동 양육비',
    dDay: 20,
    organization: '보건복지부',
    period: '2026. 05. 02. 오전 09:00 ~ 2026. 07. 31. 오후 06:00',
  },
  {
    id: '26',
    age: '만 30~34세',
    category: '교육',
    region: '구로구',
    title: '직장인 야간 대학원 등록금',
    dDay: 15,
    organization: '교육부',
    period: '2026. 05. 07. 오전 09:00 ~ 2026. 06. 30. 오후 06:00',
  },
  {
    id: '27',
    age: '전체',
    category: '취업·창업',
    region: '전체',
    title: '국민취업지원제도',
    dDay: 2,
    organization: '고용노동부',
    period: '2026. 05. 24. 오전 09:00 ~ 2026. 05. 30. 오후 06:00',
  },
  {
    id: '28',
    age: '만 19~24세',
    category: '교육',
    region: '전체',
    title: '학자금 이자 환승·상환 지원',
    dDay: 32,
    organization: '한국장학재단',
    period: '2026. 03. 15. 오전 09:00 ~ 2026. 11. 30. 오후 06:00',
  },
  {
    id: '29',
    age: '전체',
    category: '의료',
    region: '마포구',
    title: '반려동물 등록·예방접종 지원',
    dDay: 23,
    organization: '농림축산식품부',
    period: '2026. 04. 25. 오전 09:00 ~ 2026. 08. 25. 오후 06:00',
  },
  {
    id: '30',
    age: '전체',
    category: '취업·창업',
    region: '전체',
    title: '여성 재취업 컨설팅',
    dDay: 14,
    organization: '여성가족부',
    period: '2026. 05. 11. 오전 09:00 ~ 2026. 06. 28. 오후 06:00',
  },
];

const buildPolicyDetail = (
  item: PolicyItemBase
): Pick<
  PolicyItem,
  | 'introduction'
  | 'supportContents'
  | 'eligibility'
  | 'documents'
  | 'notes'
  | 'contactName'
  | 'contactPhone'
> => {
  if (item.id === '13') {
    return {
      introduction:
        '청년의 주거비 부담 완화를 위해 월세를 지원하는 정책입니다.',
      supportContents: [
        '월 최대 20만원 지원',
        '최대 12개월 지원',
        '계좌로 지급',
      ],
      eligibility: ['만 19~24세', '강남구 거주', '무주택 청년'],
      documents: ['주민등록등본', '임대차계약서', '소득 증빙 서류'],
      notes: [
        '예산 소진 시 조기 마감될 수 있습니다.',
        '중복 지원 여부를 확인해 주세요.',
      ],
      contactName: '강남구청 청년정책과',
      contactPhone: '02-1234-5678',
    };
  }

  const ageLabel = item.age === '전체' ? '연령 제한 없음' : item.age;

  return {
    introduction: `${item.title}은(는) ${item.category} 분야 지원을 위한 정책입니다.`,
    supportContents: [
      `${item.category} 관련 지원 제공`,
      '최대 12개월 지원',
      '지정 계좌로 지급',
    ],
    eligibility: [
      ageLabel,
      item.region === '전체' ? '거주 지역 제한 없음' : `${item.region} 거주`,
      `${item.category} 분야 지원 요건 충족자`,
    ],
    documents: ['주민등록등본', '신분증 사본', '소득 증빙 서류'],
    notes: [
      '예산 소진 시 조기 마감될 수 있습니다.',
      '중복 지원 여부를 확인해 주세요.',
    ],
    contactName: `${item.organization} 담당 부서`,
    contactPhone: '02-1234-5678',
  };
};

export const POLICY_ITEMS: PolicyItem[] = POLICY_ITEMS_BASE.map((item) => ({
  ...item,
  ...buildPolicyDetail(item),
}));

export const TOTAL_POLICY_COUNT = 1320;
