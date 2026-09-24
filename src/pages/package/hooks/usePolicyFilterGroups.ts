import { useMemo } from 'react';
import { useCategories } from '@pages/package/hooks/useCategories';
import { useRegions } from '@pages/package/hooks/useRegions';
import {
  AGE_GROUPS,
  type AvailabilityFilter,
} from '@pages/package/types/package';
import type { FilterGroup, FilterStatusDot } from '@pages/package/types';

const AVAILABILITY_OPTIONS: {
  id: AvailabilityFilter;
  label: string;
  statusDot: FilterStatusDot;
}[] = [
  { id: 'OPEN', label: '접수 중', statusDot: 'green' },
  { id: 'CLOSING_SOON', label: '마감 임박', statusDot: 'red' },
  { id: 'UPCOMING', label: '예정', statusDot: 'blue' },
];

const AGE_GROUP_LABELS: Record<(typeof AGE_GROUPS)[number], string> = {
  UNDER_19: '만 19세 미만',
  AGE_19_24: '만 19~24세',
  AGE_25_29: '만 25~29세',
  AGE_30_34: '만 30~34세',
  AGE_35_49: '만 35~49세',
  AGE_50_64: '만 50~64세',
  AGE_65_PLUS: '만 65세 이상',
};

type NamedOption = { id: number; name: string };

// 카테고리/지역 응답 필드가 자동생성 타입상 optional이라(API 경계) 걸러낸다.
const isNamedOption = (value: {
  id?: number;
  name?: string;
}): value is NamedOption =>
  typeof value.id === 'number' && typeof value.name === 'string';

type AgeFilterState = {
  /** true면 연령 칩 대신 안내 문구를 보여준다(추천순처럼 연령 필터를 쓸 수 없는 경우). */
  locked: boolean;
  notice?: string;
};

export const usePolicyFilterGroups = ({ locked, notice }: AgeFilterState) => {
  const { data: categories = [] } = useCategories();
  const { data: regions = [] } = useRegions();

  return useMemo<FilterGroup[]>(() => {
    const groups: FilterGroup[] = [
      {
        id: 'status',
        title: '상태',
        options: [{ id: 'all', label: '전체' }, ...AVAILABILITY_OPTIONS],
      },
    ];

    groups.push({
      id: 'category',
      title: '카테고리',
      options: [
        { id: 'all', label: '전체' },
        ...categories.filter(isNamedOption).map((category) => ({
          id: String(category.id),
          label: category.name,
        })),
      ],
    });

    groups.push({
      id: 'region',
      title: '지역',
      options: [
        { id: 'all', label: '전체' },
        ...regions
          .filter(isNamedOption)
          .map((region) => ({ id: String(region.id), label: region.name })),
      ],
    });

    // 연령 그룹 제목은 항상 보여준다. 응답이 오기 전후로 그룹이 생겼다 사라지는 깜빡임을 막기 위함이다.
    // 연령 필터를 쓸 수 없을 때는 칩 대신 안내 문구만 보여준다.
    groups.push({
      id: 'age',
      title: '연령',
      options: [
        { id: 'all', label: '전체' },
        ...AGE_GROUPS.map((ageGroup) => ({
          id: ageGroup,
          label: AGE_GROUP_LABELS[ageGroup],
        })),
      ],
      notice: locked ? notice : undefined,
    });

    return groups;
  }, [locked, notice, categories, regions]);
};
