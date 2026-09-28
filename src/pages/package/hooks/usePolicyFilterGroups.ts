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

export const AGE_GROUP_LABELS: Record<(typeof AGE_GROUPS)[number], string> = {
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
  /** 연령 칩 위에 보여줄 안내(맞춤 추천 적용 중·다른 연령 보는 중 등). */
  hint?: string;
  hintAction?: FilterGroup['hintAction'];
};

export const usePolicyFilterGroups = ({ hint, hintAction }: AgeFilterState) => {
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

    // 연령 칩은 모든 정렬·로그인 상태에서 쓸 수 있다. 로그인 사용자는 내 연령 칩 = 맞춤 추천이다.
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
      hint,
      hintAction,
    });

    return groups;
  }, [hint, hintAction, categories, regions]);
};
