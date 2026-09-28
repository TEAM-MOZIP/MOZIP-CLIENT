import FilterChip, {
  type FilterChipVariant,
} from '@pages/package/components/FilterChip';
import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';
import type { FilterGroup } from '@pages/package/types';

type TopNotice = {
  text: string;
  action?: { label: string; onClick: () => void };
};

type FilterSidebarProps = {
  groups: FilterGroup[];
  selected: Record<string, string>;
  onSelect: (groupId: string, optionId: string) => void;
  topNotice?: TopNotice;
};

const isFilterChipVariant = (id: string): id is FilterChipVariant =>
  id === 'status' || id === 'age' || id === 'category' || id === 'region';

const FilterSidebar = ({
  groups,
  selected,
  onSelect,
  topNotice,
}: FilterSidebarProps) => {
  return (
    <aside className="sticky top-[calc(8.1rem+2.4rem)] z-10 max-h-[calc(100dvh-10.5rem)] w-136 shrink-0 self-start overflow-y-auto border-r border-gray-300 pr-[3.2rem]">
      {topNotice && (
        <div className="mb-[2.4rem]">
          <div className="flex items-center gap-[0.6rem]">
            <img
              src={mozipAiIcon}
              alt=""
              aria-hidden
              className="h-[1.8rem] w-[1.8rem] shrink-0 translate-y-[-0.1rem]"
            />
            <p className="text-caption text-gray-500">{topNotice.text}</p>
          </div>
          {topNotice.action && (
            <button
              type="button"
              onClick={topNotice.action.onClick}
              className="mt-[0.4rem] cursor-pointer pl-[2.4rem] text-caption font-semibold text-title underline underline-offset-2"
            >
              {topNotice.action.label}
            </button>
          )}
        </div>
      )}
      {groups.map((group) => (
        <div key={group.id} className="mb-[4rem]">
          <h3 className="mb-[1rem] text-body-3 text-gray-700">{group.title}</h3>
          {group.hint && (
            <div className="mb-[1.2rem] rounded-[0.8rem] bg-gray-100 px-[1.2rem] py-[1rem]">
              <p className="whitespace-pre-line break-keep text-caption text-gray-600">
                {group.hint}
              </p>
              {group.hintAction && (
                <button
                  type="button"
                  onClick={group.hintAction.onClick}
                  className="mt-[0.6rem] cursor-pointer text-caption font-semibold text-title underline underline-offset-2"
                >
                  {group.hintAction.label}
                </button>
              )}
            </div>
          )}
          {group.notice ? (
            <p className="whitespace-pre-line text-caption text-gray-500">
              {group.notice}
            </p>
          ) : (
            <div className="flex flex-wrap gap-[0.8rem]">
              {group.options.map((option) => (
                <FilterChip
                  key={option.id}
                  label={option.label}
                  variant={isFilterChipVariant(group.id) ? group.id : 'status'}
                  statusDot={option.statusDot}
                  selected={selected[group.id] === option.id}
                  onClick={() => onSelect(group.id, option.id)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
};

export default FilterSidebar;
