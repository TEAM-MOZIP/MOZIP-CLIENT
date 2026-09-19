import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import {
  getPersonalizedPolicies,
  getPolicies,
} from '@pages/package/apis/policyApi';
import type {
  PolicyListFilters,
  PolicyListItem,
  PolicyListSource,
} from '@pages/package/types/package';
import { isProfileNotFoundError } from '@pages/package/utils/isProfileNotFoundError';
import {
  fromPolicyRecommendation,
  fromPolicySummary,
} from '@pages/package/utils/toPolicyListItem';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

const PAGE_SIZE = 12;

type PolicyListPage = {
  items: PolicyListItem[];
  page: number;
  totalPages: number;
  totalElements: number;
  source: PolicyListSource;
};

const fetchPolicyListPage = async (
  filters: PolicyListFilters,
  isLoggedIn: boolean,
  page: number
): Promise<PolicyListPage> => {
  if (isLoggedIn) {
    try {
      const data = await getPersonalizedPolicies({
        keyword: filters.keyword,
        categoryId: filters.categoryId,
        regionId: filters.regionId,
        page,
        size: PAGE_SIZE,
      });

      return {
        items: (data.content ?? [])
          .map(fromPolicyRecommendation)
          .filter((item): item is PolicyListItem => item !== null),
        page: data.page ?? page,
        totalPages: data.totalPages ?? 0,
        totalElements: data.totalElements ?? 0,
        source: 'personalized',
      };
    } catch (error) {
      // 프로필 미등록(온보딩 스킵) 사용자만 공개 목록으로 폴백, 그 외 에러는 그대로 전파
      if (!isProfileNotFoundError(error)) throw error;
    }
  }

  const data = await getPolicies({ ...filters, page, size: PAGE_SIZE });

  return {
    items: (data.content ?? [])
      .map(fromPolicySummary)
      .filter((item): item is PolicyListItem => item !== null),
    page: data.page ?? page,
    totalPages: data.totalPages ?? 0,
    totalElements: data.totalElements ?? 0,
    source: 'public',
  };
};

export const usePolicyList = (filters: PolicyListFilters) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useInfiniteQuery({
    queryKey: ['policies', isLoggedIn, filters],
    queryFn: ({ pageParam }) =>
      fetchPolicyListPage(filters, isLoggedIn, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 < lastPage.totalPages ? lastPage.page + 1 : undefined,
    // 필터가 바뀔 때마다 queryKey가 달라져 잠깐 data가 undefined가 되는데,
    // 그 틈에 source가 기본값('public')으로 튀면서 연령 필터가 반짝였다 사라지는
    // 문제가 있었다. 새 결과가 올 때까지 이전 데이터를 유지해서 막는다.
    placeholderData: keepPreviousData,
  });
};
