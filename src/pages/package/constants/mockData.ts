import type { PackageItem } from '@pages/package/types';
import type {
  EligibilityResponse,
  PolicyListItem,
} from '@pages/package/types/package';
import emojiBag from '@shared/assets/images/package/emoji-1-bag.png';
import emojiHouse from '@shared/assets/images/package/emoji-2-house.png';
import emojiEdu from '@shared/assets/images/package/emoji-3-edu.png';
import emojiSprout from '@shared/assets/images/package/emoji-4-sprout.png';

export type PackagePolicyView = PolicyListItem & {
  summary: string | null;
  regionScope: 'NATIONAL' | 'REGIONAL' | null;
  eligibility: EligibilityResponse | null;
  semanticScore: number | null;
};

export type PackageCategoryView = {
  categoryId: number;
  categoryName: string;
  policies: PackagePolicyView[];
};

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

const PACKAGE_COLLECTION_CATEGORIES: PackageCategoryView[] = [
  {
    categoryId: 1,
    categoryName: '취업·창업',
    policies: [
      {
        id: 101,
        title: '청년 구직활동 지원금',
        organizationName: '서울특별시',
        applicationType: 'PERIOD',
        applicationStartDate: '2026-09-01',
        applicationEndDate: '2026-10-31',
        availability: {
          status: 'AVAILABLE',
          reason: 'WITHIN_APPLICATION_PERIOD',
          closingSoon: false,
        },
        bookmarked: true,
        summary: '구직 중인 청년에게 월 50만 원을 지원합니다.',
        regionScope: 'REGIONAL',
        eligibility: {
          status: 'ELIGIBLE',
          overallReason: '연령·지역 조건을 충족해요.',
        },
        semanticScore: 0.92,
      },
      {
        id: 102,
        title: '면접 교통비 지원',
        organizationName: '고용노동부',
        applicationType: 'ALWAYS',
        applicationStartDate: null,
        applicationEndDate: null,
        availability: {
          status: 'AVAILABLE',
          reason: 'ALWAYS_OPEN',
          closingSoon: false,
        },
        bookmarked: false,
        summary: '면접 참석 시 발생하는 교통비를 실비로 지원합니다.',
        regionScope: 'NATIONAL',
        eligibility: {
          status: 'ELIGIBLE',
          overallReason: '구직 상태 조건에 맞아요.',
        },
        semanticScore: 0.81,
      },
      {
        id: 103,
        title: '청년 창업 초기 자금',
        organizationName: '중소벤처기업부',
        applicationType: 'PERIOD',
        applicationStartDate: '2026-09-15',
        applicationEndDate: '2026-09-30',
        availability: {
          status: 'AVAILABLE',
          reason: 'WITHIN_APPLICATION_PERIOD',
          closingSoon: true,
        },
        bookmarked: false,
        summary: '예비 창업자를 위한 최대 1,000만 원 초기 자금을 지원합니다.',
        regionScope: 'NATIONAL',
        eligibility: {
          status: 'NEEDS_REVIEW',
          overallReason: '사업자등록 여부를 확인해야 해요.',
        },
        semanticScore: 0.64,
      },
    ],
  },
  {
    categoryId: 2,
    categoryName: '교육',
    policies: [
      {
        id: 201,
        title: '국민내일배움카드',
        organizationName: '고용노동부',
        applicationType: 'ALWAYS',
        applicationStartDate: null,
        applicationEndDate: null,
        availability: {
          status: 'AVAILABLE',
          reason: 'ALWAYS_APPLICATION_TYPE',
          closingSoon: false,
        },
        bookmarked: false,
        summary: '직업훈련 수강료를 지원하는 평생 능력개발 카드입니다.',
        regionScope: 'NATIONAL',
        eligibility: {
          status: 'ELIGIBLE',
          overallReason: '연령 조건을 충족해요.',
        },
        semanticScore: 0.77,
      },
      {
        id: 202,
        title: '청년 자격증 응시료 지원',
        organizationName: '서울특별시',
        applicationType: 'PERIOD',
        applicationStartDate: '2026-10-01',
        applicationEndDate: '2026-11-30',
        availability: {
          status: 'UNAVAILABLE',
          reason: 'BEFORE_APPLICATION_PERIOD',
          closingSoon: false,
        },
        bookmarked: false,
        summary: '국가기술자격 응시료를 연 2회까지 지원합니다.',
        regionScope: 'REGIONAL',
        eligibility: {
          status: 'INELIGIBLE',
          overallReason: '신청 기간이 아직 시작되지 않았어요.',
        },
        semanticScore: 0.58,
      },
    ],
  },
  {
    categoryId: 3,
    categoryName: '주거',
    policies: [
      {
        id: 301,
        title: '청년 월세 특별지원',
        organizationName: '국토교통부',
        applicationType: 'PERIOD',
        applicationStartDate: '2026-08-01',
        applicationEndDate: '2026-09-28',
        availability: {
          status: 'AVAILABLE',
          reason: 'WITHIN_APPLICATION_PERIOD',
          closingSoon: true,
        },
        bookmarked: true,
        summary: '독립 거주 청년에게 월 최대 20만 원의 월세를 지원합니다.',
        regionScope: 'NATIONAL',
        eligibility: {
          status: 'ELIGIBLE',
          overallReason: '1인 가구·소득 조건을 충족해요.',
        },
        semanticScore: 0.88,
      },
      {
        id: 302,
        title: '청년 전세임대주택',
        organizationName: 'LH 한국토지주택공사',
        applicationType: 'PERIOD',
        applicationStartDate: '2026-11-01',
        applicationEndDate: '2026-11-20',
        availability: {
          status: 'UNAVAILABLE',
          reason: 'BEFORE_APPLICATION_PERIOD',
          closingSoon: false,
        },
        bookmarked: false,
        summary: '무주택 청년을 위한 전세임대 입주 기회를 제공합니다.',
        regionScope: 'NATIONAL',
        eligibility: {
          status: 'NEEDS_REVIEW',
          overallReason: '무주택 여부를 확인해야 해요.',
        },
        semanticScore: 0.71,
      },
    ],
  },
  {
    categoryId: 4,
    categoryName: '금융',
    policies: [
      {
        id: 401,
        title: '청년 도약계좌',
        organizationName: '금융위원회',
        applicationType: 'ALWAYS',
        applicationStartDate: null,
        applicationEndDate: null,
        availability: {
          status: 'AVAILABLE',
          reason: 'ALWAYS_OPEN',
          closingSoon: false,
        },
        bookmarked: false,
        summary: '만기 시 정부 기여금을 더해 목돈 마련을 돕습니다.',
        regionScope: 'NATIONAL',
        eligibility: {
          status: 'ELIGIBLE',
          overallReason: '연령·소득 조건을 충족해요.',
        },
        semanticScore: 0.83,
      },
      {
        id: 402,
        title: '청년 소액 대출',
        organizationName: '서민금융진흥원',
        applicationType: 'PERIOD',
        applicationStartDate: '2026-09-01',
        applicationEndDate: '2026-12-31',
        availability: {
          status: 'AVAILABLE',
          reason: 'WITHIN_APPLICATION_PERIOD',
          closingSoon: false,
        },
        bookmarked: false,
        summary: '생활·교육 목적의 저금리 소액 대출을 지원합니다.',
        regionScope: 'NATIONAL',
        eligibility: {
          status: 'INELIGIBLE',
          overallReason: '소득 조건이 맞지 않아요.',
        },
        semanticScore: 0.41,
      },
    ],
  },
];

const PACKAGE_CATEGORY_IDS: Record<string, number[]> = {
  'job-seeker': [1, 2],
  'solo-youth': [3, 4],
  university: [2, 1],
  'early-career': [4, 1],
};

export const getPackageCollectionCategories = (packageId: string) => {
  const categoryIds = PACKAGE_CATEGORY_IDS[packageId];
  if (!categoryIds) return PACKAGE_COLLECTION_CATEGORIES;

  return categoryIds.flatMap((categoryId) =>
    PACKAGE_COLLECTION_CATEGORIES.filter(
      (category) => category.categoryId === categoryId
    )
  );
};
