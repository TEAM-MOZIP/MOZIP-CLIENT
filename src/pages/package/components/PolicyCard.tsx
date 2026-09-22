import type { PolicyListItem } from '@pages/package/types/package';
import {
  getAvailabilityBadge,
  type AvailabilityBadgeTone,
} from '@pages/package/utils/getAvailabilityBadge';
import {
  formatPolicyPeriod,
  getDDay,
} from '@pages/package/utils/getPolicyPeriod';
import bookmarkIcon from '@shared/assets/icons/bookmark.svg';
import bookmarkFilledIcon from '@shared/assets/icons/bookmark-filled.svg';
import shareIcon from '@shared/assets/icons/share.svg';

const BADGE_TONE_CLASS: Record<AvailabilityBadgeTone, string> = {
  open: 'border-primary bg-primary-sub-2 text-black',
  closing: 'border-point bg-point/10 text-point',
  scheduled: 'border-blue bg-blue/10 text-blue',
  closed: 'border-gray-300 bg-gray-100 text-gray-600',
  review: 'border-gray-400 bg-gray-100 text-gray-600',
};

type PolicyCardProps = PolicyListItem & {
  onBookmarkClick?: () => void;
  onShareClick?: () => void;
  onClick?: () => void;
};

const PolicyCard = ({
  title,
  organizationName,
  applicationType,
  applicationStartDate,
  applicationEndDate,
  availability,
  bookmarked,
  onBookmarkClick,
  onShareClick,
  onClick,
}: PolicyCardProps) => {
  const dDay = getDDay(applicationEndDate, applicationType);
  const period = formatPolicyPeriod(
    applicationStartDate,
    applicationEndDate,
    applicationType
  );
  const badge = getAvailabilityBadge(availability);

  return (
    <div
      className={[
        'flex min-w-0 flex-col overflow-hidden rounded-[1rem] border border-gray-400 bg-white p-[2rem] gap-[2rem]',
        onClick
          ? 'cursor-pointer transition-colors duration-300 hover:bg-primary-sub-3/50'
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
        <span className="text-body-2 font-medium text-point">
          {dDay !== null
            ? `D-${dDay}`
            : applicationType === 'ALWAYS'
              ? '상시모집'
              : ''}
        </span>
        {bookmarked !== null && (
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
        )}
      </div>

      <h3 className="text-body-1 font-bold text-title truncate" title={title}>
        {title}
      </h3>

      <p className="text-body-3 text-body truncate" title={organizationName}>
        {organizationName}
      </p>

      <p className="text-body-3 text-gray-500">{period}</p>

      <div className="flex min-w-0 items-center justify-between gap-[1rem]">
        {badge ? (
          <span
            className={[
              'shrink-0 whitespace-nowrap rounded-[0.8rem] border px-[1rem] py-[0.2rem] font-semibold text-body-3',
              BADGE_TONE_CLASS[badge.tone],
            ].join(' ')}
          >
            {badge.label}
          </span>
        ) : (
          <span />
        )}
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
