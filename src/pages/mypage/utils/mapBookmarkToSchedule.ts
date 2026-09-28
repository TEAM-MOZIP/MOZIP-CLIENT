import type { ScheduleItem, ScheduleStatus } from '@pages/mypage/types';
import type {
  BookmarkResponse,
  PolicyAvailabilityResponse,
} from '@shared/apis/generated/Api';

const formatDateLabel = (dateStr: string) => {
  const [, month, day] = dateStr.split('-');
  if (!month || !day) return dateStr;
  return `${Number(month)}/${Number(day)}`;
};

const mapAvailabilityToStatus = (
  availability?: PolicyAvailabilityResponse
): ScheduleStatus => {
  if (availability?.closingSoon) return 'closing';

  switch (availability?.reason) {
    case 'BEFORE_APPLICATION_PERIOD':
      return 'scheduled';
    case 'WITHIN_APPLICATION_PERIOD':
    case 'ALWAYS_OPEN':
    case 'ALWAYS_APPLICATION_TYPE':
      return 'open';
    case 'AFTER_APPLICATION_PERIOD':
    case 'CLOSED':
    case 'DRAFT':
    case 'SUSPENDED':
      return 'closed';
    default:
      break;
  }

  if (availability?.status === 'AVAILABLE') return 'open';
  if (availability?.status === 'UNAVAILABLE') return 'closed';
  return 'scheduled';
};

export const mapBookmarkToSchedule = (
  bookmark: BookmarkResponse
): ScheduleItem | null => {
  const startDate = bookmark.applicationStartDate ?? null;
  const endDate = bookmark.applicationEndDate ?? null;

  if (!startDate && !endDate) return null;

  const id =
    bookmark.bookmarkId != null
      ? String(bookmark.bookmarkId)
      : bookmark.policyId != null
        ? String(bookmark.policyId)
        : null;

  if (id == null) return null;

  return {
    id,
    title: bookmark.title ?? '',
    startLabel: startDate ? formatDateLabel(startDate) : '상시',
    endLabel: endDate ? formatDateLabel(endDate) : '상시',
    startDate,
    endDate,
    status: mapAvailabilityToStatus(bookmark.availability),
  };
};
