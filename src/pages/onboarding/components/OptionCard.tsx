import type { ReactNode } from 'react';

type OptionCardProps = {
  label: string;
  description?: string;
  icon?: ReactNode;
  selected: boolean;
  onClick: () => void;
};

const MozipStarIcon = () => (
  <svg
    aria-hidden
    viewBox="0 0 40 40"
    className="w-[1.8rem] shrink-0"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 0L23.3676 11.8699L34.1421 5.85786L28.1301 16.6324L40 20L28.1301 23.3676L34.1421 34.1421L23.3676 28.1301L20 40L16.6324 28.1301L5.85786 34.1421L11.8699 23.3676L0 20L11.8699 16.6324L5.85786 5.85786L16.6324 11.8699L20 0Z"
      fill="#FFF360"
    />
  </svg>
);

/** 온보딩 카드형 선택지(성별·하는 일·관심 분야). 선택 시 오른쪽 위 모집 별 아이콘으로 선택 상태를 보여준다. */
const OptionCard = ({
  label,
  description,
  icon,
  selected,
  onClick,
}: OptionCardProps) => {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={[
        'relative flex min-h-[9.2rem] cursor-pointer flex-col items-start rounded-[1.6rem] border-[0.15rem] p-[1.8rem] pr-[4.4rem] text-left transition-colors',
        selected
          ? 'border-primary bg-primary-sub-3'
          : 'border-gray-200 bg-white hover:border-gray-400',
      ].join(' ')}
    >
      {selected && (
        <span aria-hidden className="absolute top-[1.2rem] right-[1.2rem]">
          <MozipStarIcon />
        </span>
      )}
      {icon && <span className="mb-[1rem]">{icon}</span>}
      <span className="text-heading-4 text-gray-800">{label}</span>
      {description && (
        <span className="mt-[0.4rem] text-caption text-gray-500">
          {description}
        </span>
      )}
    </button>
  );
};

export default OptionCard;
