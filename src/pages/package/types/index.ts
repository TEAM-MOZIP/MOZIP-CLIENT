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

export type PolicyItem = {
  id: string;
  tags: string[];
  title: string;
  dDay: number;
  organization: string;
  period: string;
  bookmarked?: boolean;
};
