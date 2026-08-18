import {
  POPULAR_DISTRICTS,
  SEOUL_DISTRICTS,
} from '@pages/onboarding/constants/districts';

const normalizeDistrictQuery = (value: string) =>
  value.trim().replace(/\s/g, '').replace(/구$/, '');

export const getVisibleDistricts = (
  query: string,
  selected: string | null
): string[] => {
  const keyword = normalizeDistrictQuery(query);

  const source: string[] = keyword
    ? SEOUL_DISTRICTS.filter((name) =>
        normalizeDistrictQuery(name).includes(keyword)
      )
    : [...POPULAR_DISTRICTS];

  if (selected && !source.includes(selected)) {
    return [selected, ...source];
  }

  return source;
};
