import type { PolicyAvailability } from '@pages/package/types/package';

export type AvailabilityBadgeTone =
  | 'open'
  | 'closing'
  | 'scheduled'
  | 'closed'
  | 'review';

// 상태 필터 칩과 같은 모양의 접수 상태 칩에 쓰는 점 색(흰 배경 + 회색 테두리 + 상태 색 점).
export const AVAILABILITY_DOT_CLASS: Record<AvailabilityBadgeTone, string> = {
  open: 'bg-green-500',
  closing: 'bg-red-500',
  scheduled: 'bg-blue-500',
  closed: 'bg-gray-400',
  review: 'bg-gray-400',
};

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
      ? { label: '마감 임박', tone: 'closing' }
      : { label: '접수 중', tone: 'open' };
  }

  return availability.reason === 'BEFORE_APPLICATION_PERIOD'
    ? { label: '예정', tone: 'scheduled' }
    : { label: '마감', tone: 'closed' };
};
