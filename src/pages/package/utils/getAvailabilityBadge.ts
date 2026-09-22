import type { PolicyAvailability } from '@pages/package/types/package';

export type AvailabilityBadgeTone =
  | 'open'
  | 'closing'
  | 'scheduled'
  | 'closed'
  | 'review';

export type AvailabilityBadge = {
  label: string;
  tone: AvailabilityBadgeTone;
};

// 서버 status 파라미터(운영 상태)와 별개로, 화면엔 응답의 availability(신청 가능
// 여부)만 배지로 보여준다 — 이 축은 검색 필터로 지원되지 않아 표시 전용이다.
export const getAvailabilityBadge = (
  availability: PolicyAvailability | null
): AvailabilityBadge | null => {
  if (!availability?.status) return null;

  if (availability.status === 'NEEDS_REVIEW') {
    return { label: '확인 필요', tone: 'review' };
  }

  if (availability.status === 'AVAILABLE') {
    return availability.closingSoon
      ? { label: '마감임박', tone: 'closing' }
      : { label: '접수중', tone: 'open' };
  }

  return availability.reason === 'BEFORE_APPLICATION_PERIOD'
    ? { label: '예정', tone: 'scheduled' }
    : { label: '마감', tone: 'closed' };
};
