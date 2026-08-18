import type {
  AgeGroup,
  SituationCategory,
} from '@pages/onboarding/types/onboarding';

export const SITUATIONS_BY_AGE_GROUP: Record<AgeGroup, SituationCategory[]> = {
  // 10대
  teens: [
    {
      id: 'student',
      label: '학생',
      options: [
        { id: 'elementary', label: '초등학생' },
        { id: 'middle-school', label: '중학생' },
        { id: 'high-school', label: '고등학생' },
        { id: 'out-of-school', label: '학교 밖 청소년' },
      ],
    },
    {
      id: 'career',
      label: '진로',
      options: [
        { id: 'college-prep', label: '대학 진학 준비' },
        { id: 'job-prep', label: '취업 준비' },
      ],
    },
    {
      id: 'life',
      label: '생활',
      options: [{ id: 'part-time', label: '아르바이트' }],
    },
  ],

  // 20·30대
  twentiesThirties: [
    {
      id: 'student',
      label: '학생',
      options: [
        { id: 'university', label: '대학생' },
        { id: 'graduate', label: '대학원생' },
        { id: 'on-leave', label: '휴학생' },
      ],
    },
    {
      id: 'employment',
      label: '취업',
      options: [
        { id: 'job-prep', label: '취업 준비' },
        { id: 'job-seeking', label: '구직 중' },
        { id: 'employed', label: '직장인' },
        { id: 'career-change', label: '이직 준비' },
      ],
    },
    {
      id: 'work',
      label: '창업·일',
      options: [
        { id: 'early-founder', label: '초기 창업' },
        { id: 'self-employed', label: '자영업' },
        { id: 'freelancer', label: '프리랜서' },
      ],
    },
    {
      id: 'housing-life',
      label: '주거·생활',
      options: [
        { id: 'independent-prep', label: '독립 준비' },
        { id: 'single-household', label: '1인 가구' },
        { id: 'newlywed', label: '신혼/예비' },
        { id: 'parenting', label: '자녀 양육' },
      ],
    },
    {
      id: 'military',
      label: '병역',
      options: [
        { id: 'military-service', label: '군 복무 중' },
        { id: 'social-service', label: '사회복무요원' },
      ],
    },
  ],

  // 40·50대
  fortiesFifties: [
    {
      id: 'employment',
      label: '취업',
      options: [
        { id: 'employed', label: '직장인' },
        { id: 'job-seeking', label: '구직 중' },
        { id: 'career-change', label: '이직 준비' },
        { id: 'unemployed', label: '실업' },
      ],
    },
    {
      id: 'work',
      label: '창업·일',
      options: [
        { id: 'startup-prep', label: '창업 준비' },
        { id: 'freelancer', label: '프리랜서' },
      ],
    },
    {
      id: 'family',
      label: '가족',
      options: [
        { id: 'parenting', label: '자녀 양육' },
        { id: 'child-education', label: '자녀 교육' },
        { id: 'supporting-parents', label: '부모 부양' },
      ],
    },
    {
      id: 'housing-life',
      label: '주거·생활',
      options: [
        { id: 'single-household', label: '1인 가구' },
        { id: 'newlywed', label: '신혼/예비' },
        { id: 'housing-move', label: '주거 이전 준비' },
      ],
    },
    {
      id: 'later-life',
      label: '노후',
      options: [
        { id: 'retirement-prep', label: '은퇴/퇴직 준비' },
        { id: 'rural-prep', label: '귀농/귀촌 준비' },
      ],
    },
  ],

  // 60대 이상
  sixtiesPlus: [
    {
      id: 'work',
      label: '일',
      options: [
        { id: 'retired', label: '은퇴 생활' },
        { id: 'reemployment-prep', label: '재취업 준비' },
        { id: 'working', label: '근로 중' },
        { id: 'self-employed', label: '자영업' },
      ],
    },
    {
      id: 'housing-life',
      label: '주거·생활',
      options: [
        { id: 'single-household', label: '1인 가구' },
        { id: 'grandchildren', label: '손자녀 육아' },
        { id: 'housing-move', label: '주거 이전 준비' },
        { id: 'rural-prep', label: '귀농/귀촌 준비' },
      ],
    },
    {
      id: 'health-later-life',
      label: '건강·노후',
      options: [
        { id: 'later-life-prep', label: '노후 생활 준비' },
        { id: 'health-care', label: '건강 관리' },
      ],
    },
  ],
};

export const getSituationIds = (ageGroup: AgeGroup) =>
  SITUATIONS_BY_AGE_GROUP[ageGroup].flatMap((category) =>
    category.options.map((option) => option.id)
  );
