export type FilterStatusDot = 'green' | 'red' | 'blue';

export type FilterOption = {
  id: string;
  label: string;
  statusDot?: FilterStatusDot;
};

export type FilterGroup = {
  id: string;
  title: string;
  options: FilterOption[];
};

export type PackageItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
  policyCount: number;
};

/** 상태 옵션 */
export const POLICY_STATUSES = [
  '전체',
  '접수 중',
  '마감 임박',
  '예정',
] as const;

/** 연령 옵션 */
export const POLICY_AGES = [
  '전체',
  '만 19~24세',
  '만 25~29세',
  '만 30~34세',
  '60대 이상',
] as const;

/** 카테고리 옵션 */
export const POLICY_CATEGORIES = [
  '전체',
  '취업·창업',
  '교육',
  '주거',
  '금융',
  '의료',
  '문화',
] as const;

/** 지역 옵션 */
export const POLICY_REGIONS = [
  '전체',
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
] as const;

export type PolicyAge = (typeof POLICY_AGES)[number];
export type PolicyCategory = (typeof POLICY_CATEGORIES)[number];
export type PolicyRegion = (typeof POLICY_REGIONS)[number];

export type PolicyItem = {
  id: string;
  age: PolicyAge;
  category: PolicyCategory;
  region: PolicyRegion;
  title: string;
  dDay: number;
  organization: string;
  period: string;
  bookmarked?: boolean;
  introduction: string;
  supportContents: string[];
  eligibility: string[];
  documents: string[];
  notes: string[];
  contactName: string;
  contactPhone: string;
};
