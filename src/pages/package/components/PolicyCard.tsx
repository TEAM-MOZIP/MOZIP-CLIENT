import type { PolicyItem } from '@pages/package/types';
import { TAG_STYLES } from '@pages/package/constants/tagStyles';
import bookmarkIcon from '@shared/assets/icons/bookmark.svg';
import bookmarkFilledIcon from '@shared/assets/icons/bookmark-filled.svg';
import shareIcon from '@shared/assets/icons/share.svg';

type PolicyCardProps = PolicyItem & {
  onBookmarkClick?: () => void;
  onShareClick?: () => void;
  onClick?: () => void;
};

const PolicyCard = ({
  age,
  category,
  region,
  title,
  dDay,
  bookmarked = false,
  onBookmarkClick,
  onShareClick,
  onClick,
}: PolicyCardProps) => {
  const tags = [
    { kind: 'age' as const, label: age },
    { kind: 'category' as const, label: category },
    { kind: 'region' as const, label: region },
  ];

  return (
    <div
      className={[
        'flex min-w-0 flex-col overflow-hidden rounded-[1rem] border border-gray-400 bg-white p-[2rem] gap-[2rem]',
        onClick
          ? 'cursor-pointer transition-colors duration-300 hover:bg-[#FFFDE5]'
          : '',
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
      <div className="flex items-center justify-between gap-[1rem]">
        <span className="text-body-2 font-medium text-point">D-{dDay}</span>
        <button
          type="button"
          aria-label={bookmarked ? '북마크 해제' : '북마크'}
          aria-pressed={bookmarked}
          onClick={(e) => {
            e.stopPropagation();
            onBookmarkClick?.();
          }}
          className="shrink-0 cursor-pointer"
        >
          <img
            src={bookmarked ? bookmarkFilledIcon : bookmarkIcon}
            alt=""
            aria-hidden
            className="size-[2.4rem]"
          />
        </button>
      </div>

      <h3 className="text-body-1 font-bold text-title truncate" title={title}>
        {title}
      </h3>

      <div className="flex min-w-0 items-center justify-between gap-[1rem]">
        <div className="flex min-w-0 flex-nowrap gap-[1rem] overflow-hidden">
          {tags.map(({ kind, label }) => {
            const style = TAG_STYLES[kind];
            return (
              <span
                key={kind}
                className="shrink-0 whitespace-nowrap rounded-[0.8rem] border px-[1rem] py-[0.2rem] font-semibold text-body-3 text-title"
                style={{
                  borderColor: style.border,
                  backgroundColor: style.background,
                }}
              >
                {label}
              </span>
            );
          })}
        </div>
        <button
          type="button"
          aria-label="공유"
          onClick={(e) => {
            e.stopPropagation();
            onShareClick?.();
          }}
          className="shrink-0 cursor-pointer"
        >
          <img src={shareIcon} alt="" aria-hidden className="size-[2.4rem]" />
        </button>
      </div>
    </div>
  );
};

export default PolicyCard;
