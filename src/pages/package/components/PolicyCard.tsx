import type { PolicyItem } from '@pages/package/types';

const ROUND_STAR_PATH =
  'M11.48 3.499a.562.562 0 0 1 1.04 0l1.965 4.677a.563.563 0 0 0 .475.31h5.092c.483 0 .684.618.294.88l-4.12 3.224a.563.563 0 0 0-.182.88l1.57 4.826a.562.562 0 0 1-.86.627l-4.116-3.225a.563.563 0 0 0-.694 0l-4.116 3.225a.562.562 0 0 1-.86-.627l1.57-4.826a.563.563 0 0 0-.182-.88l-4.12-3.224a.562.562 0 0 1 .294-.88h5.092a.563.563 0 0 0 .475-.31l1.965-4.677z';

type BookmarkStarIconProps = {
  filled: boolean;
};

const BookmarkStarIcon = ({ filled }: BookmarkStarIconProps) => (
  <svg
    className="size-[2.2rem]"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d={ROUND_STAR_PATH}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type PolicyCardProps = PolicyItem & {
  onBookmarkClick?: () => void;
  onClick?: () => void;
};

const PolicyCard = ({
  tags,
  title,
  dDay,
  organization,
  period,
  bookmarked = false,
  onBookmarkClick,
  onClick,
}: PolicyCardProps) => {
  return (
    <div
      className={[
        'flex flex-col rounded-[1.2rem] border border-gray-200 bg-white p-8',
        onClick ? 'cursor-pointer hover:border-gray-400' : '',
      ].join(' ')}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between gap-[1.2rem]">
        <div className="flex flex-wrap gap-[0.6rem]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-primary-sub-2 px-4 py-[0.4rem] text-caption text-title"
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          aria-label={bookmarked ? '북마크 해제' : '북마크'}
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkClick?.();
          }}
          className="shrink-0 cursor-pointer text-title"
        >
          <BookmarkStarIcon filled={bookmarked} />
        </button>
      </div>

      <div className="mt-[1.2rem] flex items-start gap-[0.8rem]">
        <h3 className="text-body-1 text-title">{title}</h3>
        <span className="shrink-0 text-body-3 font-semibold text-red-500">
          D-{dDay}
        </span>
      </div>

      <p className="mt-[1.2rem] text-body-3 text-body">🏛 {organization}</p>
      <p className="mt-[0.4rem] text-caption text-gray-500">{period}</p>
    </div>
  );
};

export default PolicyCard;
