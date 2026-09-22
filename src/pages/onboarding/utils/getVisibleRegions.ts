import { POPULAR_DISTRICT_NAMES } from '@pages/onboarding/constants/districts';
import type { RegionResponse } from '@pages/onboarding/types/onboarding';

export type SelectableDistrict = { id: number; name: string };

const normalizeDistrictQuery = (value: string) =>
  value.trim().replace(/\s/g, '').replace(/구$/, '');

// GET /api/regions 응답엔 상위 지역(서울특별시)과 자치구가 함께 내려오고
// parentId가 없어 API 응답만으로는 구분이 안 되므로, "구"로 끝나는 이름만
// 선택 가능한 자치구로 취급한다. id/name은 자동생성 타입상 optional이라
// API 경계에서 한 번 걸러 이후 로직은 값이 있다고 가정할 수 있게 한다.
const isSelectableDistrict = (
  region: RegionResponse
): region is RegionResponse & SelectableDistrict =>
  typeof region.id === 'number' &&
  typeof region.name === 'string' &&
  region.name.endsWith('구');

const getSelectableDistricts = (regions: RegionResponse[]) =>
  regions.filter(isSelectableDistrict);

// 인기 지역을 앞쪽에 두고, 나머지는 가나다순으로 정렬한다.
const sortDistricts = (districts: SelectableDistrict[]) =>
  [...districts].sort((a, b) => {
    const aIsPopular = POPULAR_DISTRICT_NAMES.includes(a.name);
    const bIsPopular = POPULAR_DISTRICT_NAMES.includes(b.name);
    if (aIsPopular !== bIsPopular) return aIsPopular ? -1 : 1;
    return a.name.localeCompare(b.name, 'ko');
  });

export const getVisibleRegions = (
  regions: RegionResponse[],
  query: string,
  selectedId: number | null
): SelectableDistrict[] => {
  const districts = getSelectableDistricts(regions);
  const keyword = normalizeDistrictQuery(query);

  const filtered = keyword
    ? districts.filter((region) =>
        normalizeDistrictQuery(region.name).includes(keyword)
      )
    : districts;

  const source = sortDistricts(filtered);

  const selected = districts.find((region) => region.id === selectedId);
  if (selected && !source.some((region) => region.id === selected.id)) {
    return [selected, ...source];
  }

  return source;
};
