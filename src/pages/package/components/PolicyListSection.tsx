import { useEffect, useRef, useState } from 'react';
import FilterSidebar from '@pages/package/components/FilterSidebar';
import PolicyCard from '@pages/package/components/PolicyCard';
import PolicyDetailModal from '@pages/package/components/PolicyDetailModal';
import type { FilterGroup, PolicyItem } from '@pages/package/types';
import arrowDownIcon from '@shared/assets/icons/arrow-down.svg';

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'deadline', label: '마감 임박 순' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];

type PolicyListSectionProps = {
  filterGroups: FilterGroup[];
  policies: PolicyItem[];
  totalCount: number;
};

const PolicyListSection = ({
  filterGroups,
  policies,
  totalCount,
}: PolicyListSectionProps) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    () => new Set(policies.filter((p) => p.bookmarked).map((p) => p.id))
  );
  const [selectedPolicyId, setSelectedPolicyId] = useState<string | null>(null);
  const [sort, setSort] = useState<SortValue>('latest');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const selectedPolicy =
    policies.find((policy) => policy.id === selectedPolicyId) ?? null;

  const selectedSortLabel =
    SORT_OPTIONS.find((option) => option.value === sort)?.label ?? '최신순';

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

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
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
          <FilterSidebar groups={filterGroups} />

          <div className="min-w-0 flex-1">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-body-1 text-body font-medium">
                총{' '}
                <span className="font-bold text-title">
                  {totalCount.toLocaleString()}
                </span>{' '}
                개의 정책
              </p>

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
                    {SORT_OPTIONS.filter((option) => option.value !== sort).map(
                      (option) => (
                        <button
                          key={option.value}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            setSort(option.value);
                            setIsSortOpen(false);
                          }}
                          className="flex w-full cursor-pointer items-center whitespace-nowrap px-[1rem] py-[0.8rem] text-body-3 text-body font-medium hover:bg-gray-100"
                        >
                          {option.label}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[3.6rem_3.2rem]">
              {policies.map((policy) => (
                <PolicyCard
                  key={policy.id}
                  {...policy}
                  bookmarked={bookmarkedIds.has(policy.id)}
                  onBookmarkClick={() => toggleBookmark(policy.id)}
                  onClick={() => setSelectedPolicyId(policy.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedPolicy && (
        <PolicyDetailModal
          policy={selectedPolicy}
          bookmarked={bookmarkedIds.has(selectedPolicy.id)}
          onClose={() => setSelectedPolicyId(null)}
          onBookmarkClick={() => toggleBookmark(selectedPolicy.id)}
        />
      )}
    </section>
  );
};

export default PolicyListSection;
