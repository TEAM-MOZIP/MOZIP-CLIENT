import type { FilterStatusDot } from '@pages/package/types';

type FilterChipProps = {
  label: string;
  selected?: boolean;
  statusDot?: FilterStatusDot;
  onClick?: () => void;
};

const STATUS_DOT_CLASS: Record<FilterStatusDot, string> = {
  green: 'bg-green-500',
  red: 'bg-red-500',
  blue: 'bg-blue-500',
};

const FilterChip = ({
  label,
  selected = false,
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
          ? 'border-primary bg-primary text-title'
          : 'border-gray-200 bg-white text-body hover:border-gray-400',
      ].join(' ')}
    >
      {statusDot && (
        <span
          className={`size-[0.6rem] shrink-0 rounded-full ${STATUS_DOT_CLASS[statusDot]}`}
          aria-hidden
        />
      )}
      {label}
    </button>
  );
};

export default FilterChip;
