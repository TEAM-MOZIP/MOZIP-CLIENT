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
        'inline-flex cursor-pointer items-center justify-center rounded-full border px-[2rem] py-[1rem] text-body-2 transition-colors',
        selected
          ? 'border-primary bg-primary-sub-2 font-semibold text-black'
          : 'border-primary bg-white font-medium text-black hover:bg-primary-sub-2',
      ].join(' ')}
    >
      {label}
    </button>
  );
};

export default SelectionChip;
