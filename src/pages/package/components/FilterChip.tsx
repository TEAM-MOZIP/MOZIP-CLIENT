import type { FilterStatusDot } from '@pages/package/types';

export type FilterChipVariant = 'status' | 'age' | 'category' | 'region';

type FilterChipProps = {
  label: string;
  selected?: boolean;
  variant?: FilterChipVariant;
  statusDot?: FilterStatusDot;
  onClick?: () => void;
};

const SELECTED_CLASS: Record<FilterChipVariant, string> = {
  status: 'border-gray-300 bg-gray-200 font-semibold text-gray-700',
  age: 'border-[#FFF360] bg-[#FFFABC] font-semibold text-gray-700',
  category: 'border-[#8CE29C] bg-[#DDFAD4] font-semibold text-gray-700',
  region: 'border-[#97C4FF] bg-[#D7EAFF] font-semibold text-gray-700',
};

const STATUS_DOT_CLASS: Record<FilterStatusDot, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
};

const FilterChip = ({
  label,
  selected = false,
  variant = 'status',
  statusDot,
  onClick,
}: FilterChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'inline-flex cursor-pointer items-center justify-center gap-[0.6rem] rounded-full border px-[1.2rem] py-[0.6rem] text-caption transition-colors',
        selected
          ? SELECTED_CLASS[variant]
          : 'border-gray-200 bg-white font-medium text-gray-600 hover:border-gray-400',
      ].join(' ')}
    >
      {statusDot && (
        <span
          className={`size-[0.8rem] shrink-0 rounded-full ${STATUS_DOT_CLASS[statusDot]}`}
          aria-hidden
        />
      )}
      {label}
    </button>
  );
};

export default FilterChip;
