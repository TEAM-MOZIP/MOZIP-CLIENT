import { useEffect, useMemo, useRef, useState } from 'react';
import FilterSidebar from '@pages/package/components/FilterSidebar';
import PolicyCard from '@pages/package/components/PolicyCard';
import PolicyDetailModal from '@pages/package/components/PolicyDetailModal';
import { useMyProfile } from '@pages/package/hooks/useMyProfile';
import { usePolicyFilterGroups } from '@pages/package/hooks/usePolicyFilterGroups';
import { usePolicyList } from '@pages/package/hooks/usePolicyList';
import { useToggleBookmark } from '@pages/package/hooks/useToggleBookmark';
import type {
  AgeGroup,
  AvailabilityFilter,
  PolicyListFilters,
  PolicyListItem,
  PolicySortOption,
} from '@pages/package/types/package';
import arrowDownIcon from '@shared/assets/icons/chevron-down.svg';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

const SORT_OPTIONS: { value: PolicySortOption; label: string }[] = [
  { value: 'recommended', label: '추천순' },
  { value: 'createdAt,desc', label: '최신순' },
  { value: 'applicationEndDate,asc', label: '마감 임박 순' },
];

type FilterSelection = {
  status: string;
  age: string;
  category: string;
  region: string;
};

const INITIAL_SELECTION: FilterSelection = {
  status: 'all',
  age: 'all',
  category: 'all',
  region: 'all',
};

const PERSONALIZED_AGE_NOTICE =
  '온보딩에서 입력한 정보로 맞춤 추천하고 있어요.\n연령 필터 없이도 내게 맞는 정책만 보여요.';
const RECOMMENDED_AGE_NOTICE =
  '신청 가능한 정책부터 추천하고 있어요.\n연령 필터는 최신순·마감 임박 순에서 사용해 보세요.';

const PolicyListSection = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const { data: myProfile, isLoading: isMyProfileLoading } = useMyProfile();
  const [selection, setSelection] =
    useState<FilterSelection>(INITIAL_SELECTION);
  const [sort, setSort] = useState<PolicySortOption>('recommended');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [bookmarkOverrides, setBookmarkOverrides] = useState<
    Record<number, boolean>
  >({});
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // 연령 필터를 쓸 수 있는지는 응답(source)이 아니라 요청 전에 알 수 있는 값으로 정한다.
  // 응답을 기다리면 첫 로딩·정렬 변경 때 연령 그룹이 생겼다 사라지는 깜빡임이 생긴다.
  // - 로그인 + 프로필 있음(프로필 확인 중 포함) → 맞춤 추천 목록: 서버가 연령 필터를 지원하지 않음
  // - 추천순 → 공개 추천 목록: 서버가 연령 필터를 지원하지 않음
  const isPersonalized =
    isLoggedIn && (isMyProfileLoading || myProfile != null);
  const isAgeFilterLocked = isPersonalized || sort === 'recommended';

  const filters = useMemo<PolicyListFilters>(
    () => ({
      categoryId:
        selection.category === 'all' ? undefined : Number(selection.category),
      regionId:
        selection.region === 'all' ? undefined : Number(selection.region),
      availability:
        selection.status === 'all'
          ? undefined
          : (selection.status as AvailabilityFilter),
      ageGroup:
        isAgeFilterLocked || selection.age === 'all'
          ? undefined
          : (selection.age as AgeGroup),
      sort,
    }),
    [selection, sort, isAgeFilterLocked]
  );

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePolicyList(filters);
  const { mutate: mutateBookmark } = useToggleBookmark();

  const pages = data?.pages ?? [];
  const items = pages.flatMap((page) => page.items);
  const totalElements = pages[0]?.totalElements ?? 0;
  const showSort = !isPersonalized;

  const filterGroups = usePolicyFilterGroups({
    locked: isAgeFilterLocked,
    notice: isPersonalized ? PERSONALIZED_AGE_NOTICE : RECOMMENDED_AGE_NOTICE,
  });

  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? '추천순';

  useEffect(() => {
    if (!isSortOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isSortOpen]);

  const handleSelectFilter = (groupId: string, optionId: string) => {
    if (groupId === 'age' && isAgeFilterLocked) return;
    setSelection((prev) => ({ ...prev, [groupId]: optionId }));
  };

  const isBookmarked = (item: PolicyListItem) =>
    bookmarkOverrides[item.id] ?? item.bookmarked ?? false;

  const handleBookmarkClick = (item: PolicyListItem) => {
    const next = !isBookmarked(item);
    setBookmarkOverrides((prev) => ({ ...prev, [item.id]: next }));
    mutateBookmark(
      { policyId: item.id, bookmarked: next },
      {
        onError: () => {
          setBookmarkOverrides((prev) => ({ ...prev, [item.id]: !next }));
        },
      }
    );
  };

  return (
    <section className="w-full bg-background-default py-[3.2rem]">
      <div className="mx-auto w-full px-16">
        <div>
          <h2 className="text-heading-2 text-title">정책 목록</h2>
          <p className="mt-[0.4rem] text-body-2 text-body">
            필터링을 통해 나에게 맞는 정책을 확인해 보세요.
          </p>
        </div>

        <div className="mt-[4rem] flex items-start gap-[3.2rem]">
          <FilterSidebar
            groups={filterGroups}
            selected={selection}
            onSelect={handleSelectFilter}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-body-1 text-body font-medium">
                총{' '}
                <span className="font-bold text-title">
                  {totalElements.toLocaleString()}
                </span>{' '}
                개의 정책
              </p>

              {showSort ? (
                <div ref={sortRef} className="relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={isSortOpen}
                    onClick={() => setIsSortOpen((prev) => !prev)}
                    className="flex cursor-pointer items-center gap-[0.8rem] text-body-3 text-title font-medium"
                  >
                    {selectedSortLabel}
                    <img
                      src={arrowDownIcon}
                      alt=""
                      aria-hidden
                      className="h-[0.6rem] w-[1.2rem]"
                    />
                  </button>

                  {isSortOpen && (
                    <div
                      role="menu"
                      className="absolute top-[calc(100%+0.6rem)] right-0 z-50 min-w-full overflow-hidden rounded-[0.8rem] border border-gray-200 bg-white shadow-[0_0.4rem_1.2rem_rgba(0,0,0,0.08)]"
                    >
                      {SORT_OPTIONS.filter(
                        (option) => option.value !== sort
                      ).map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setSort(option.value);
                            // 연령 필터를 못 쓰는 정렬로 바꾸면 이전 선택을 초기화한다 —
                            // 숨겨진 선택값이 다른 정렬로 돌아왔을 때 몰래 다시 적용되지 않게.
                            if (option.value === 'recommended') {
                              setSelection((prev) => ({ ...prev, age: 'all' }));
                            }
                            setIsSortOpen(false);
                          }}
                          className="flex w-full cursor-pointer items-center whitespace-nowrap px-[1rem] py-[0.8rem] text-body-3 text-body font-medium hover:bg-gray-100"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-body-3 text-gray-500">
                  추천순으로 정렬됩니다
                </p>
              )}
            </div>

            {isLoading ? (
              <p className="py-[4rem] text-center text-body-2 text-gray-500">
                정책 목록을 불러오는 중이에요.
              </p>
            ) : isError ? (
              <p className="py-[4rem] text-center text-body-2 text-gray-500">
                정책 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
              </p>
            ) : items.length === 0 ? (
              <p className="py-[4rem] text-center text-body-2 text-gray-500">
                조건에 맞는 정책이 없어요.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-[3.6rem_3.2rem]">
                  {items.map((policy) => (
                    <PolicyCard
                      key={policy.id}
                      {...policy}
                      bookmarked={
                        policy.bookmarked === null ? null : isBookmarked(policy)
                      }
                      onBookmarkClick={() => handleBookmarkClick(policy)}
                      onClick={() => setSelectedPolicyId(policy.id)}
                    />
                  ))}
                </div>

                {hasNextPage && (
                  <div className="mt-[3.2rem] flex justify-center">
                    <button
                      type="button"
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="rounded-[0.8rem] border border-gray-300 px-[3.2rem] py-[1.2rem] text-button-2 text-title transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isFetchingNextPage ? '불러오는 중...' : '더보기'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedPolicyId !== null && (
        <PolicyDetailModal
          policyId={selectedPolicyId}
          onClose={() => setSelectedPolicyId(null)}
        />
      )}
    </section>
  );
};

export default PolicyListSection;
