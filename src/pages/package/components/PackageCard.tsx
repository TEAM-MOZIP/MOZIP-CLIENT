import type { PackageItem, PackageTheme } from '@pages/package/types';

type PackageCardProps = PackageItem & {
  onClick?: () => void;
};

const THEME_STYLES: Record<PackageTheme, { card: string; title: string }> = {
  yellow: {
    card: 'bg-primary-sub-1 text-gray-800',
    title: 'text-gray-600',
  },
  black: {
    card: 'bg-gray-700 text-white',
    title: 'text-gray-400',
  },
};

const PackageCard = ({
  title,
  headline,
  pattern,
  theme,
  policyCount,
  onClick,
}: PackageCardProps) => {
  const styles = THEME_STYLES[theme];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[40rem] w-full cursor-pointer flex-col overflow-hidden rounded-[2.4rem] text-left transition-transform duration-200 hover:-translate-y-[0.4rem] ${styles.card}`}
    >
      <img
        src={pattern}
        alt=""
        aria-hidden
        className="h-[22rem] w-full shrink-0 object-cover object-left"
        draggable={false}
      />

      <div className="mt-auto flex items-end justify-between gap-[1.2rem] p-[2.4rem]">
        <div className="min-w-0">
          <h3 className="whitespace-pre-line text-heading-2 font-bold leading-[1.3]">
            {headline}
          </h3>
          <p className={`mt-[1rem] text-body-3 font-medium ${styles.title}`}>
            {title}
          </p>
        </div>
        <span className="inline-flex shrink-0 rounded-full border border-black bg-white px-[1.2rem] py-[0.4rem] text-button-2 font-medium text-black">
          {policyCount} +
        </span>
      </div>
    </button>
  );
};

export default PackageCard;
