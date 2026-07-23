import { useState } from 'react';
import FilterSidebar from '@pages/package/components/FilterSidebar';
import PolicyCard from '@pages/package/components/PolicyCard';
import type { FilterGroup, PolicyItem } from '@pages/package/types';

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
        <h2 className="text-heading-2 text-title">정책 목록</h2>

        <div className="mt-[2.4rem] flex items-start gap-[3.2rem]">
          <FilterSidebar groups={filterGroups} />

          <div className="min-w-0 flex-1">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-body-2 text-body">
                총{' '}
                <span className="font-semibold text-title">
                  {totalCount.toLocaleString()}
                </span>
                개의 정책
              </p>
              <select
                className="cursor-pointer rounded-[0.8rem] border border-gray-200 bg-white px-[1.2rem] py-[0.8rem] text-body-3 text-body"
                defaultValue="latest"
              >
                <option value="latest">최신순</option>
                <option value="deadline">마감임박순</option>
              </select>
            </div>

            <div className="grid grid-cols-3 gap-[1.6rem]">
              {policies.map((policy) => (
                <PolicyCard
                  key={policy.id}
                  {...policy}
                  bookmarked={bookmarkedIds.has(policy.id)}
                  onBookmarkClick={() => toggleBookmark(policy.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicyListSection;
