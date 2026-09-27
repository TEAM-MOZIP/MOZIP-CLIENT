type SelectionChipProps = {
  label: string;
  selected?: boolean;
  onClick: () => void;
};

const SelectionChip = ({
  label,
  selected = false,
  onClick,
}: SelectionChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'inline-flex cursor-pointer items-center justify-center rounded-full border px-[1.6rem] py-[0.9rem] text-body-3 transition-colors',
        selected
          ? 'border-primary bg-primary-sub-2 font-bold text-gray-800'
          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400',
      ].join(' ')}
    >
      {label}
    </button>
  );
};

export default SelectionChip;
