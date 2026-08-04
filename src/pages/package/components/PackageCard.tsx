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
      <img
        src={icon}
        alt=""
        aria-hidden
        className="h-[4rem] w-[4rem] object-contain"
        draggable={false}
      />

      <h3 className="mt-[1.2rem] text-heading-4 text-title font-bold">
        {title}
      </h3>
      <p className="mt-[0.8rem] line-clamp-2 text-body-3 text-body font-medium">
        {description}
      </p>
      <span className="mt-[1.2rem] ml-auto inline-flex w-fit rounded-[0.8rem] bg-primary-sub-2 px-[1rem] py-[0.4rem] text-button-2 font-medium">
        {policyCount} +
      </span>
    </button>
  );
};

export default PackageCard;
