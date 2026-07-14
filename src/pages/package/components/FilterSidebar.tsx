import { useState } from 'react';
import FilterChip from '@pages/package/components/FilterChip';
import type { FilterGroup } from '@pages/package/types';

type FilterSidebarProps = {
  groups: FilterGroup[];
};

const FilterSidebar = ({ groups }: FilterSidebarProps) => {
  const [selected, setSelected] = useState<Record<string, string>>({
    age: 'all',
    category: 'all',
    region: 'seoul',
  });

  const handleSelect = (groupId: string, optionId: string) => {
    setSelected((prev) => ({ ...prev, [groupId]: optionId }));
  };

  return (
    <aside className="sticky top-[calc(8.1rem+2.4rem)] z-10 max-h-[calc(100dvh-10.5rem)] w-112 shrink-0 self-start overflow-y-auto border-r border-gray-200 pr-[3.2rem]">
      <p className="mb-[2.4rem] text-body-2 text-body">
        필터링을 통해 나에게 맞는 정책을 확인해 보세요.
      </p>

      {groups.map((group) => (
        <div key={group.id} className="mb-[2.4rem]">
          <h3 className="mb-[1.2rem] text-body-2 text-title">{group.title}</h3>
          <div className="flex flex-wrap gap-[0.8rem]">
            {group.options.map((option) => (
              <FilterChip
                key={option.id}
                label={option.label}
                statusDot={option.statusDot}
                selected={selected[group.id] === option.id}
                onClick={() => handleSelect(group.id, option.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;
