import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getPackageDetail,
  getPackages,
  getPackageSectionPolicies,
  getPersonalizedPackageDetail,
  getPersonalizedPackages,
  getPersonalizedPackageSectionPolicies,
} from '@pages/package/apis/policyApi';
import type {
  PolicyListItem,
  PolicyPackageDetail,
  PolicyPackageDetailResponse,
} from '@pages/package/types/package';
import { isProfileNotFoundError } from '@pages/package/utils/isProfileNotFoundError';
import {
  fromPolicyRecommendation,
  fromPolicySummary,
} from '@pages/package/utils/toPolicyListItem';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

const SECTION_PAGE_SIZE = 12;

// 북마크 토글 시 useToggleBookmark가 ['policies']를 무효화하므로, 패키지 쿼리도 그 아래에 둔다.
const PACKAGES_QUERY_KEY = ['policies', 'packages'] as const;

// 로그인 사용자는 개인화 API를 먼저 쓰고, 프로필 미등록(온보딩 스킵)이면 공개 API로 폴백한다.
// 그 외 에러는 그대로 전파한다 (정책 목록 usePolicyList와 같은 기준).
const withProfileFallback = async <T>(
  isLoggedIn: boolean,
  personalized: () => Promise<T>,
  publicFetch: () => Promise<T>
): Promise<T> => {
  if (isLoggedIn) {
    try {
      return await personalized();
    } catch (error) {
      if (!isProfileNotFoundError(error)) throw error;
    }
  }
  return publicFetch();
};

const toItems = <T>(
  policies: T[] | undefined,
  mapper: (policy: T) => PolicyListItem | null
) =>
  (policies ?? [])
    .map(mapper)
    .filter((item): item is PolicyListItem => item !== null);

const toDetail = <T>(
  response: PolicyPackageDetailResponse<T>,
  mapper: (policy: T) => PolicyListItem | null
): PolicyPackageDetail => ({
  packageId: response.packageId ?? '',
  policyCount: response.policyCount ?? 0,
  sections: (response.sections ?? []).flatMap((section) =>
    section.sectionKey
      ? [
          {
            key: section.sectionKey,
            name: section.sectionName ?? '',
            totalCount: section.totalCount ?? 0,
            policies: toItems(section.policies, mapper),
          },
        ]
      : []
  ),
});

/** 패키지 카드용: packageId → 정책 수 */
export const usePackageCounts = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: [...PACKAGES_QUERY_KEY, isLoggedIn],
    queryFn: () =>
      withProfileFallback(isLoggedIn, getPersonalizedPackages, getPackages),
    select: (packages): Record<string, number> =>
      Object.fromEntries(
        packages.flatMap((item) =>
          item.packageId ? [[item.packageId, item.policyCount ?? 0]] : []
        )
      ),
  });
};

/** 패키지 상세: 섹션별 전체 개수 + 미리보기 */
export const usePackageDetail = (packageId: string, enabled = true) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useQuery({
    queryKey: [...PACKAGES_QUERY_KEY, packageId, isLoggedIn],
    queryFn: () =>
      withProfileFallback<PolicyPackageDetail>(
        isLoggedIn,
        async () =>
          toDetail(
            await getPersonalizedPackageDetail(packageId),
            fromPolicyRecommendation
          ),
        async () =>
          toDetail(await getPackageDetail(packageId), fromPolicySummary)
      ),
    enabled,
  });
};

type PackageSectionPage = {
  items: PolicyListItem[];
  page: number;
  totalPages: number;
  totalElements: number;
};

/** 패키지 섹션 전체(더보기) */
export const usePackageSectionPolicies = (
  packageId: string,
  sectionKey: string | null
) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);

  return useInfiniteQuery({
    queryKey: [
      ...PACKAGES_QUERY_KEY,
      packageId,
      'sections',
      sectionKey,
      isLoggedIn,
    ],
    queryFn: ({ pageParam }) => {
      const key = sectionKey ?? '';
      const params = { page: pageParam, size: SECTION_PAGE_SIZE };
      return withProfileFallback<PackageSectionPage>(
        isLoggedIn,
        async () => {
          const data = await getPersonalizedPackageSectionPolicies(
            packageId,
            key,
            params
          );
          return {
            items: toItems(data.content, fromPolicyRecommendation),
            page: data.page ?? pageParam,
            totalPages: data.totalPages ?? 0,
            totalElements: data.totalElements ?? 0,
          };
        },
        async () => {
          const data = await getPackageSectionPolicies(packageId, key, params);
          return {
            items: toItems(data.content, fromPolicySummary),
            page: data.page ?? pageParam,
            totalPages: data.totalPages ?? 0,
            totalElements: data.totalElements ?? 0,
          };
        }
      );
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.page + 1 < lastPage.totalPages ? lastPage.page + 1 : undefined,
    enabled: sectionKey !== null,
  });
};
