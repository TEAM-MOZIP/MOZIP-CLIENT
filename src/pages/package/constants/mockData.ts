import type { PackageItem } from '@pages/package/types';
import type {
  ApplicationGuideResponse,
  EligibilityResponse,
  PolicyDetailResponse,
  PolicyEligibilityResponse,
  PolicyEvaluationResponse,
  PolicyListItem,
  PolicySummaryContentResponse,
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 19~34세 구간에 해당해요.',
            },
            {
              type: 'REGION',
              status: 'MATCHED',
              reason: '서울시 거주 조건에 맞아요.',
            },
            {
              type: 'EMPLOYMENT_STATUS',
              status: 'MATCHED',
              reason: '구직 중 상태예요.',
            },
          ],
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 18~34세 구간에 해당해요.',
            },
            {
              type: 'EMPLOYMENT_STATUS',
              status: 'MATCHED',
              reason: '고용센터 구직 등록이 되어 있어요.',
            },
          ],
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 39세 이하 조건에 맞아요.',
            },
            {
              type: 'ADDITIONAL_CONDITIONS',
              status: 'NEEDS_REVIEW',
              reason: '사업자등록 또는 예비창업 증빙이 필요해요.',
            },
          ],
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 75세 이하 조건에 맞아요.',
            },
          ],
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 19~34세 구간에 해당해요.',
            },
            {
              type: 'REGION',
              status: 'MATCHED',
              reason: '서울시 거주 조건에 맞아요.',
            },
          ],
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 19~34세 구간에 해당해요.',
            },
            {
              type: 'HOUSEHOLD_TYPE',
              status: 'MATCHED',
              reason: '1인 가구예요.',
            },
            {
              type: 'INCOME',
              status: 'MATCHED',
              reason: '기준 중위소득 150% 이하예요.',
            },
          ],
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 19~39세 구간에 해당해요.',
            },
            {
              type: 'ADDITIONAL_CONDITIONS',
              status: 'NEEDS_REVIEW',
              reason: '무주택 여부를 확인해야 해요.',
            },
          ],
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 19~34세 구간에 해당해요.',
            },
            {
              type: 'INCOME',
              status: 'MATCHED',
              reason: '연소득 기준을 충족해요.',
            },
          ],
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
          conditionResults: [
            {
              type: 'AGE',
              status: 'MATCHED',
              reason: '만 19~34세 구간에 해당해요.',
            },
            {
              type: 'INCOME',
              status: 'NOT_MATCHED',
              reason: '연소득 3,500만 원 이하 조건에 맞지 않아요.',
            },
          ],
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

export type PackagePolicyDetailBundle = {
  detail: PolicyDetailResponse;
  guide: ApplicationGuideResponse;
  summary: PolicySummaryContentResponse;
  evaluation: PolicyEvaluationResponse;
};

type PackagePolicyDetailExtra = {
  description: string;
  benefitDescription: string;
  targetDescription: string;
  applicationMethod: string;
  sourceUrl: string;
  status: NonNullable<PolicyDetailResponse['status']>;
  eligibilityConditions: PolicyEligibilityResponse;
  aiSummary: string;
  guide: Omit<ApplicationGuideResponse, 'policyId'>;
};

const PACKAGE_POLICY_DETAIL_EXTRAS: Record<number, PackagePolicyDetailExtra> = {
  101: {
    description:
      '구직 활동을 하는 청년에게 활동비를 지원해 안정적으로 취업을 준비할 수 있도록 돕는 정책입니다.',
    benefitDescription:
      '월 50만 원을 최대 6개월간 지급합니다. 취업 알선, 이력서 컨설팅 등 취업 지원 프로그램도 함께 이용할 수 있습니다.',
    targetDescription:
      '서울시 거주 만 19~34세 미취업 청년 중 기준 중위소득 150% 이하인 분이 신청할 수 있습니다.',
    applicationMethod: '서울청년포털에서 온라인 신청',
    sourceUrl: 'https://youth.seoul.go.kr',
    status: 'OPEN',
    eligibilityConditions: {
      minimumAge: 19,
      maximumAge: 34,
      incomeType: 'MEDIAN_PERCENTAGE',
      maximumIncomeValue: 150,
      allowedEmploymentStatuses: ['UNEMPLOYED', 'JOB_SEEKER'],
    },
    aiSummary:
      '서울 거주 미취업 청년에게 월 50만 원을 최대 6개월 지원하는 정책이에요. 지금 접수 중이고, 연령·지역 조건에 맞아요.',
    guide: {
      applicationUrl: 'https://youth.seoul.go.kr',
      contactInfo: '서울시 청년청 02-2133-1234',
      notes:
        '지원 기간 중 취업하면 다음 달부터 지급이 중단됩니다. 활동 내역을 매월 제출해야 합니다.',
      requiredDocuments: [
        '신분증 사본',
        '주민등록등본',
        '구직등록 확인서',
        '소득 확인 서류',
      ],
      steps: [
        {
          order: 1,
          title: '서울청년포털 회원가입',
          description: '본인인증 후 청년 계정을 만듭니다.',
        },
        {
          order: 2,
          title: '신청서 작성',
          description: '개인정보와 구직 활동 계획을 입력합니다.',
        },
        {
          order: 3,
          title: '서류 제출',
          description: '필요 서류를 스캔해 업로드합니다.',
        },
        {
          order: 4,
          title: '심사 결과 확인',
          description: '약 2주 후 문자와 이메일로 결과를 안내합니다.',
        },
      ],
    },
  },
  102: {
    description:
      '취업 면접에 참석할 때 발생하는 교통비를 실비로 지원해 구직 부담을 줄여주는 정책입니다.',
    benefitDescription:
      '1회 면접당 최대 5만 원, 연간 10회까지 교통비를 실비 정산합니다. 시외·고속버스, KTX, 항공권도 대상입니다.',
    targetDescription:
      '고용센터에 구직 등록된 만 18~34세 청년이면 거주 지역과 관계없이 신청할 수 있습니다.',
    applicationMethod: '고용24에서 온라인 신청 또는 관할 고용센터 방문',
    sourceUrl: 'https://www.work24.go.kr',
    status: 'ALWAYS_OPEN',
    eligibilityConditions: {
      minimumAge: 18,
      maximumAge: 34,
      allowedEmploymentStatuses: ['JOB_SEEKER', 'UNEMPLOYED'],
    },
    aiSummary:
      '면접 교통비를 1회 최대 5만 원, 연 10회까지 실비 지원해요. 상시 접수이고 구직 등록만 되어 있으면 됩니다.',
    guide: {
      applicationUrl: 'https://www.work24.go.kr',
      contactInfo: '고용노동부 고객상담센터 1350',
      notes:
        '면접 종료 후 14일 이내에 신청해야 하며, 영수증 원본이 필요합니다.',
      requiredDocuments: [
        '신분증',
        '면접 확인서',
        '교통비 영수증',
        '구직등록증',
      ],
      steps: [
        {
          order: 1,
          title: '고용24 로그인',
          description: '공동인증서 또는 간편인증으로 로그인합니다.',
        },
        {
          order: 2,
          title: '면접 내역 등록',
          description: '면접 일자, 기업명, 장소를 입력합니다.',
        },
        {
          order: 3,
          title: '영수증 첨부',
          description: '교통비 영수증과 면접 확인서를 업로드합니다.',
        },
      ],
    },
  },
  103: {
    description:
      '예비 창업자의 사업 시작을 돕기 위해 초기 자금을 지원하는 정책입니다.',
    benefitDescription:
      '사업화 자금 최대 1,000만 원을 지원합니다. 멘토링, 공간 임차료, 시제품 제작비로 사용할 수 있습니다.',
    targetDescription:
      '만 39세 이하 예비 창업자 또는 업력 3년 미만 초기 창업자가 대상입니다. 사업자등록 여부를 확인합니다.',
    applicationMethod: 'K-Startup 누리집에서 온라인 신청',
    sourceUrl: 'https://www.k-startup.go.kr',
    status: 'OPEN',
    eligibilityConditions: {
      maximumAge: 39,
      allowedEmploymentStatuses: ['UNEMPLOYED', 'EMPLOYED'],
    },
    aiSummary:
      '예비·초기 창업자에게 최대 1,000만 원을 지원해요. 마감이 임박했고, 사업자등록 여부를 확인해야 합니다.',
    guide: {
      applicationUrl: 'https://www.k-startup.go.kr',
      contactInfo: '중소벤처기업부 1357',
      notes:
        '선정 후 3개월 이내 사업자등록을 해야 하며, 중도 포기 시 지원금을 반환해야 합니다.',
      requiredDocuments: [
        '사업계획서',
        '주민등록등본',
        '창업 교육 수료증',
        '통장 사본',
      ],
      steps: [
        {
          order: 1,
          title: 'K-Startup 회원가입',
          description: '창업지원포털 계정을 만듭니다.',
        },
        {
          order: 2,
          title: '사업계획서 제출',
          description: '아이템 소개와 자금 사용 계획을 작성합니다.',
        },
        {
          order: 3,
          title: '발표 평가',
          description: '서류 통과 시 대면 또는 화상 발표를 진행합니다.',
        },
      ],
    },
  },
  201: {
    description:
      '직업훈련 수강료를 지원하는 평생 능력개발 카드로, 다양한 직무 교육을 들을 수 있습니다.',
    benefitDescription:
      '5년간 최대 500만 원의 훈련비를 지원합니다. 일부 과정은 훈련장려금도 함께 지급됩니다.',
    targetDescription:
      '만 75세 이하 국민이면 대부분 발급받을 수 있습니다. 공무원, 사립학교 교직원 등은 제외됩니다.',
    applicationMethod: '고용24 또는 가까운 HRD 담당 고용센터',
    sourceUrl: 'https://www.hrd.go.kr',
    status: 'ALWAYS_OPEN',
    eligibilityConditions: {
      maximumAge: 75,
    },
    aiSummary:
      '직업훈련 수강료를 5년간 최대 500만 원까지 지원하는 카드예요. 상시 발급이고 연령 조건만 맞으면 됩니다.',
    guide: {
      applicationUrl: 'https://www.hrd.go.kr',
      contactInfo: '고용노동부 고객상담센터 1350',
      notes:
        '발급 후 180일 이내 첫 훈련을 시작하지 않으면 계좌가 정지될 수 있습니다.',
      requiredDocuments: ['신분증', '증빙 서류(해당 시 재직·실업 확인)'],
      steps: [
        {
          order: 1,
          title: '발급 신청',
          description: '고용24에서 국민내일배움카드를 신청합니다.',
        },
        {
          order: 2,
          title: '카드 수령',
          description: '지정 카드사에서 실물 카드를 받습니다.',
        },
        {
          order: 3,
          title: '훈련 과정 신청',
          description: 'HRD-Net에서 원하는 과정을 검색해 수강 신청합니다.',
        },
      ],
    },
  },
  202: {
    description:
      '국가기술자격 등 취업에 필요한 자격증 응시료를 지원하는 서울시 정책입니다.',
    benefitDescription:
      '국가기술자격 응시료를 연 2회까지 전액 지원합니다. 합격 여부와 관계없이 응시 후 환급됩니다.',
    targetDescription:
      '서울시 거주 만 19~34세 청년 중 기준 중위소득 120% 이하인 분이 대상입니다.',
    applicationMethod: '서울청년포털에서 온라인 신청',
    sourceUrl: 'https://youth.seoul.go.kr',
    status: 'OPEN',
    eligibilityConditions: {
      minimumAge: 19,
      maximumAge: 34,
      incomeType: 'MEDIAN_PERCENTAGE',
      maximumIncomeValue: 120,
    },
    aiSummary:
      '자격증 응시료를 연 2회까지 지원해요. 신청 기간이 아직 시작되지 않았고, 지금은 신청할 수 없습니다.',
    guide: {
      applicationUrl: 'https://youth.seoul.go.kr',
      contactInfo: '서울시 일자리정책과 02-2133-5450',
      notes:
        '응시 후 60일 이내 신청해야 하며, 접수증과 납부 영수증이 필요합니다.',
      requiredDocuments: [
        '신분증',
        '응시 접수증',
        '응시료 납부 영수증',
        '주민등록등본',
      ],
      steps: [
        {
          order: 1,
          title: '자격 시험 응시',
          description: '국가기술자격 시험에 접수한 뒤 응시료를 납부합니다.',
        },
        {
          order: 2,
          title: '환급 신청',
          description: '서울청년포털에서 응시 내역과 영수증을 제출합니다.',
        },
        {
          order: 3,
          title: '심사·지급',
          description: '서류 확인 후 2주 이내 계좌로 입금됩니다.',
        },
      ],
    },
  },
  301: {
    description:
      '독립해 거주하는 청년의 주거비 부담을 덜어주기 위해 월세를 한시 지원하는 정책입니다.',
    benefitDescription:
      '월 최대 20만 원을 최대 12개월간 지원합니다. 임차보증금과 월세 계약이 확인된 주택이 대상입니다.',
    targetDescription:
      '무주택 1인 가구 청년으로, 기준 중위소득 150% 이하이며 월세 60만 원 이하 주택에 거주해야 합니다.',
    applicationMethod: '복지로 또는 주민센터 방문 신청',
    sourceUrl: 'https://www.bokjiro.go.kr',
    status: 'OPEN',
    eligibilityConditions: {
      minimumAge: 19,
      maximumAge: 34,
      incomeType: 'MEDIAN_PERCENTAGE',
      maximumIncomeValue: 150,
      allowedHouseholdTypes: ['SINGLE'],
    },
    aiSummary:
      '독립 거주 청년에게 월 최대 20만 원의 월세를 지원해요. 마감이 임박했고, 1인 가구·소득 조건에 맞아요.',
    guide: {
      applicationUrl: 'https://www.bokjiro.go.kr',
      contactInfo: '보건복지상담센터 129',
      notes:
        '임대차계약서상 임차인과 신청인이 같아야 하며, 공공임대 거주자는 제외됩니다.',
      requiredDocuments: [
        '신분증',
        '임대차계약서',
        '주민등록등본',
        '소득·재산 신고서',
        '월세 이체 내역',
      ],
      steps: [
        {
          order: 1,
          title: '자격 조회',
          description: '복지로에서 소득·가구 자격을 확인합니다.',
        },
        {
          order: 2,
          title: '온라인 신청',
          description: '계약 정보와 계좌를 입력하고 서류를 첨부합니다.',
        },
        {
          order: 3,
          title: '현장 확인',
          description: '필요 시 주민센터에서 실거주 여부를 확인합니다.',
        },
      ],
    },
  },
  302: {
    description:
      '무주택 청년이 시중 전셋집에 거주할 수 있도록 LH가 전세 계약을 맺고 저렴하게 재임대하는 정책입니다.',
    benefitDescription:
      '전세보증금의 최대 100%를 LH가 지원하고, 입주자는 저렴한 임대료만 부담합니다. 거주 기간은 최초 2년, 재계약 시 최대 10년입니다.',
    targetDescription:
      '만 19~39세 무주택 청년으로, 소득이 전년도 도시근로자 가구당 월평균 소득의 100% 이하여야 합니다.',
    applicationMethod: 'LH 청약플러스에서 온라인 신청',
    sourceUrl: 'https://apply.lh.or.kr',
    status: 'OPEN',
    eligibilityConditions: {
      minimumAge: 19,
      maximumAge: 39,
      incomeType: 'MEDIAN_PERCENTAGE',
      maximumIncomeValue: 100,
      allowedHouseholdTypes: ['SINGLE'],
    },
    aiSummary:
      '무주택 청년을 위한 전세임대 입주 기회예요. 아직 신청 기간 전이고, 무주택 여부를 확인해야 합니다.',
    guide: {
      applicationUrl: 'https://apply.lh.or.kr',
      contactInfo: 'LH 콜센터 1600-1004',
      notes:
        '선정 후 지정 기간 안에 주택을 물색해야 하며, 권리 분석에 통과한 주택만 계약할 수 있습니다.',
      requiredDocuments: [
        '신분증',
        '주민등록등본',
        '가족관계증명서',
        '소득 증빙 서류',
        '무주택 확인서',
      ],
      steps: [
        {
          order: 1,
          title: 'LH 청약플러스 신청',
          description: '공고를 확인하고 자격 정보를 입력합니다.',
        },
        {
          order: 2,
          title: '선정 대기',
          description: '소득·자산 심사를 거쳐 대상자로 선정됩니다.',
        },
        {
          order: 3,
          title: '주택 물색·계약',
          description: '원하는 전셋집을 구한 뒤 LH와 임대 계약을 진행합니다.',
        },
      ],
    },
  },
  401: {
    description:
      '청년이 매월 일정 금액을 저축하면 정부가 기여금을 더해 만기에 목돈을 만들 수 있게 돕는 정책입니다.',
    benefitDescription:
      '월 70만 원까지 납입할 수 있고, 정부 기여금과 비과세 혜택이 제공됩니다. 가입 기간은 5년입니다.',
    targetDescription:
      '만 19~34세 청년 중 개인소득 기준을 충족하는 분이 대상입니다. 직전 3개년 중 1회 이상 금융소득종합과세 대상이면 제외됩니다.',
    applicationMethod: '취급 은행 앱 또는 영업점 방문',
    sourceUrl: 'https://www.fsc.go.kr',
    status: 'ALWAYS_OPEN',
    eligibilityConditions: {
      minimumAge: 19,
      maximumAge: 34,
      incomeType: 'ABSOLUTE',
      maximumIncomeValue: 7500,
    },
    aiSummary:
      '만기 시 정부 기여금을 더해 목돈을 마련하는 청년 전용 적금이에요. 상시 가입이고 연령·소득 조건에 맞아요.',
    guide: {
      applicationUrl: 'https://www.fsc.go.kr',
      contactInfo: '금융위원회 민원상담 02-2100-2900',
      notes:
        '가입 후 중도 해지하면 정부 기여금이 지급되지 않으며, 비과세 혜택도 적용되지 않습니다.',
      requiredDocuments: ['신분증', '소득 확인 서류', '국세청 소득금액증명'],
      steps: [
        {
          order: 1,
          title: '자격 확인',
          description: '은행 앱에서 연령·소득 자격을 조회합니다.',
        },
        {
          order: 2,
          title: '계좌 개설',
          description: '취급 은행에서 청년도약계좌를 개설합니다.',
        },
        {
          order: 3,
          title: '자동이체 설정',
          description: '월 납입액을 정하고 자동이체를 등록합니다.',
        },
      ],
    },
  },
  402: {
    description:
      '생활비나 교육비처럼 급하게 필요한 자금을 낮은 금리로 빌릴 수 있는 청년 소액 대출입니다.',
    benefitDescription:
      '최대 500만 원까지, 연 3.5% 고정금리로 대출할 수 있습니다. 상환 기간은 최대 5년(거치 1년 포함)입니다.',
    targetDescription:
      '만 19~34세 청년 중 연소득 3,500만 원 이하인 분이 대상입니다. 신용점수와 기존 대출 현황을 심사합니다.',
    applicationMethod: '서민금융진흥원 앱 또는 서민금융통합지원센터',
    sourceUrl: 'https://www.kinfa.or.kr',
    status: 'OPEN',
    eligibilityConditions: {
      minimumAge: 19,
      maximumAge: 34,
      incomeType: 'ABSOLUTE',
      maximumIncomeValue: 3500,
    },
    aiSummary:
      '생활·교육 목적의 저금리 소액 대출이에요. 접수 중이지만 소득 조건이 맞지 않아 신청이 어려워요.',
    guide: {
      applicationUrl: 'https://www.kinfa.or.kr',
      contactInfo: '서민금융콜센터 1397',
      notes:
        '연체 이력이 있으면 거절될 수 있고, 생활비 외 사업 자금 목적은 신청할 수 없습니다.',
      requiredDocuments: [
        '신분증',
        '소득 증빙',
        '재학·재직 확인서',
        '대출 목적 확인 서류',
      ],
      steps: [
        {
          order: 1,
          title: '사전 조회',
          description: '앱에서 예상 한도와 금리를 확인합니다.',
        },
        {
          order: 2,
          title: '서류 제출',
          description: '소득과 사용 목적을 증빙하는 서류를 올립니다.',
        },
        {
          order: 3,
          title: '약정·실행',
          description: '심사 통과 후 약정하고 지정 계좌로 입금됩니다.',
        },
      ],
    },
  },
};

const findPackagePolicyView = (policyId: number) => {
  for (const category of PACKAGE_COLLECTION_CATEGORIES) {
    const policy = category.policies.find((item) => item.id === policyId);
    if (policy) return policy;
  }
  return null;
};

export const getPackagePolicyDetailBundle = (
  policyId: number
): PackagePolicyDetailBundle | null => {
  const policy = findPackagePolicyView(policyId);
  const extra = PACKAGE_POLICY_DETAIL_EXTRAS[policyId];
  if (!policy || !extra) return null;

  return {
    detail: {
      id: policy.id,
      title: policy.title,
      organizationName: policy.organizationName,
      applicationType: policy.applicationType,
      applicationStartDate: policy.applicationStartDate ?? undefined,
      applicationEndDate: policy.applicationEndDate ?? undefined,
      availability: policy.availability ?? undefined,
      bookmarked: policy.bookmarked ?? false,
      regionScope: policy.regionScope ?? undefined,
      summary: policy.summary ?? undefined,
      description: extra.description,
      benefitDescription: extra.benefitDescription,
      targetDescription: extra.targetDescription,
      applicationMethod: extra.applicationMethod,
      sourceUrl: extra.sourceUrl,
      status: extra.status,
      eligibility: extra.eligibilityConditions,
    },
    guide: {
      ...extra.guide,
      policyId: policy.id,
      applicationType: policy.applicationType,
      applicationStartDate: policy.applicationStartDate ?? undefined,
      applicationEndDate: policy.applicationEndDate ?? undefined,
      availability: policy.availability ?? undefined,
    },
    summary: {
      policyId: policy.id,
      summary: extra.aiSummary,
    },
    evaluation: {
      policyId: policy.id,
      availability: policy.availability ?? undefined,
      eligibility: policy.eligibility ?? undefined,
    },
  };
};
