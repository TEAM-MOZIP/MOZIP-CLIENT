import type { PackageItem } from '@pages/package/types';

type PackageCardProps = PackageItem & {
  onClick?: () => void;
};

const PackageCard = ({
  icon,
  title,
  description,
  policyCount,
  onClick,
}: PackageCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full w-full cursor-pointer flex-col rounded-[1.2rem] border border-primary bg-white p-8 text-left transition-shadow hover:shadow-md"
    >
      <span className="text-[2.4rem]" aria-hidden>
        {icon}
      </span>
      <h3 className="mt-[1.2rem] text-heading-4 text-title">{title}</h3>
      <p className="mt-[0.8rem] line-clamp-2 text-body-3 text-body">
        {description}
      </p>
      <span className="mt-[1.6rem] inline-flex w-fit rounded-full bg-primary-sub-2 px-[1.2rem] py-[0.6rem] text-caption text-title">
        정책 {policyCount}개 묶음
      </span>
    </button>
  );
};

export default PackageCard;
