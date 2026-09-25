import type {
  EligibilityStatus,
  PolicyListItem,
} from '@pages/package/types/package';
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
import rightChevronIcon from '@shared/assets/icons/right-chevron.svg';
import { STATUS_OUTLINE_CLASS } from '@pages/package/components/FilterChip';
import { formatAgeRange } from '@pages/package/utils/formatAgeRange';
import { displayValue } from '@shared/utils/displayValue';

// 왼쪽 "상태" 필터 칩과 같은 모양: 흰 배경 + 회색 테두리 + 상태 색 점.
const BADGE_DOT_CLASS: Record<AvailabilityBadgeTone, string> = {
  open: 'bg-green-500',
  closing: 'bg-red-500',
  scheduled: 'bg-blue-500',
  closed: 'bg-gray-400',
  review: 'bg-gray-400',
};

// 개인화 응답에서만 보여주는 자격 판정 칩
const ELIGIBILITY_CHIPS: Record<
  EligibilityStatus,
  { label: string; className: string }
> = {
  ELIGIBLE: {
    label: '자격 충족',
    className: 'border-primary bg-primary-sub-2 text-black',
  },
  NEEDS_REVIEW: {
    label: '자격 확인 필요',
    className: 'border-gray-400 bg-gray-100 text-gray-600',
  },
  INELIGIBLE: {
    label: '자격 미충족',
    className: 'border-gray-300 bg-white text-gray-500',
  },
};

// 카드 폭이 좁아 카테고리 칩은 2개, 지역 칩은 1개까지만 보여주고 나머지는 +N으로 줄인다.
// 하단 칩 줄: 자격 판정(로그인) → 카테고리 → 지역 → 연령. 넘치면 다음 줄로 내린다.
const MAX_VISIBLE_CATEGORIES = 2;
const MAX_VISIBLE_REGIONS = 1;
const NATIONAL_REGION_LABEL = '전국';

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
  categories,
  regionScope,
  regions,
  eligibilityStatus,
  ageRange,
  onBookmarkClick,
  onClick,
}: PolicyCardProps) => {
  const dDay = getDDay(applicationEndDate, applicationType);
  const period = formatPolicyPeriod(
    applicationStartDate,
    applicationEndDate,
    applicationType
  );
  const badge = getAvailabilityBadge(availability);
  const ageLabel = ageRange ? formatAgeRange(ageRange.min, ageRange.max) : null;
  const visibleCategories = categories.slice(0, MAX_VISIBLE_CATEGORIES);
  const hiddenCategoryCount = categories.length - visibleCategories.length;
  const regionNames =
    regionScope === 'NATIONAL'
      ? [NATIONAL_REGION_LABEL]
      : regions.map((region) => region.name);
  const visibleRegionNames = regionNames.slice(0, MAX_VISIBLE_REGIONS);
  const hiddenRegionNames = regionNames.slice(MAX_VISIBLE_REGIONS);
  const eligibilityChip = eligibilityStatus
    ? ELIGIBILITY_CHIPS[eligibilityStatus]
    : null;

  return (
    <div
      className={[
        'flex min-w-0 flex-col overflow-hidden rounded-[2rem] bg-white p-[2.4rem] shadow-[0_0.4rem_1.6rem_rgba(0,0,0,0.12)] gap-[2rem]',
        onClick
          ? 'cursor-pointer transition-[transform,box-shadow] duration-300 hover:-translate-y-[0.6rem] hover:shadow-[0_1.2rem_3.2rem_rgba(0,0,0,0.18)]'
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
        <div className="flex min-w-0 items-center gap-[0.8rem]">
          <span className="text-heading-3 text-gray-800">
            {dDay !== null
              ? `D-${dDay}`
              : applicationType === 'ALWAYS'
                ? '상시모집'
                : ''}
          </span>
          {badge && (
            <span
              className={`inline-flex shrink-0 items-center gap-[0.6rem] whitespace-nowrap rounded-full border bg-white px-[1rem] py-[0.2rem] text-caption font-medium text-gray-600 outline-gray-200 ${STATUS_OUTLINE_CLASS}`}
            >
              <span
                aria-hidden
                className={`size-[0.8rem] shrink-0 rounded-full ${BADGE_DOT_CLASS[badge.tone]}`}
              />
              {badge.label}
            </span>
          )}
        </div>
        <div className="flex shrink-0 items-center">
          <span
            aria-hidden
            className="flex size-[4.2rem] items-center justify-center rounded-full bg-gray-100"
          >
            <img src={rightChevronIcon} alt="" className="size-[1.8rem]" />
          </span>
        </div>
      </div>

      <h3
        className="text-heading-3 font-bold text-title truncate"
        title={title}
      >
        {title}
      </h3>

      <p
        className="text-body-3 text-body truncate"
        title={displayValue(organizationName)}
      >
        {displayValue(organizationName)}
      </p>

      <p className="text-body-3 text-gray-500">{period}</p>

      <div className="flex min-w-0 items-end justify-between gap-[1rem]">
        <div className="flex min-w-0 flex-wrap items-center gap-[0.6rem]">
          {eligibilityChip && (
            <span
              className={[
                'shrink-0 whitespace-nowrap rounded-full border px-[1rem] py-[0.2rem] text-caption font-semibold',
                eligibilityChip.className,
              ].join(' ')}
            >
              {eligibilityChip.label}
            </span>
          )}
          {visibleCategories.map((category) => (
            <span
              key={category.id}
              className="shrink-0 whitespace-nowrap rounded-full border border-[#8CE29C] bg-[#DDFAD4] px-[1rem] py-[0.2rem] text-caption font-semibold text-gray-700"
            >
              {category.name}
            </span>
          ))}
          {hiddenCategoryCount > 0 && (
            <span
              className="shrink-0 text-caption text-gray-500"
              title={categories
                .slice(MAX_VISIBLE_CATEGORIES)
                .map((category) => category.name)
                .join(', ')}
            >
              +{hiddenCategoryCount}
            </span>
          )}
          {visibleRegionNames.map((name) => (
            <span
              key={name}
              className="shrink-0 whitespace-nowrap rounded-full border border-[#97C4FF] bg-[#D7EAFF] px-[1rem] py-[0.2rem] text-caption font-semibold text-gray-700"
            >
              {name}
            </span>
          ))}
          {hiddenRegionNames.length > 0 && (
            <span
              className="shrink-0 text-caption text-gray-500"
              title={hiddenRegionNames.join(', ')}
            >
              +{hiddenRegionNames.length}
            </span>
          )}
          {ageLabel && (
            <span className="shrink-0 whitespace-nowrap rounded-full border border-[#C9B8FF] bg-[#EEE8FF] px-[1rem] py-[0.2rem] text-caption font-semibold text-gray-700">
              {ageLabel}
            </span>
          )}
        </div>
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
    </div>
  );
};

export default PolicyCard;
