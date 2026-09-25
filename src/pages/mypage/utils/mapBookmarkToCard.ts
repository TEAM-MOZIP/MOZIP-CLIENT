import type { BookmarkResponse } from '@shared/apis/generated/Api';
import type { PolicyListItem } from '@pages/package/types/package';

// BookmarkResponse엔 applicationType이 없어서, availability.reason으로
// 상시모집 여부를 추론한다(pages/package의 dDay/기간 계산 유틸과 호환되도록).
const ALWAYS_OPEN_REASONS = new Set(['ALWAYS_OPEN', 'ALWAYS_APPLICATION_TYPE']);

export const mapBookmarkToCardItem = (
  bookmark: BookmarkResponse
): PolicyListItem | null => {
  if (bookmark.policyId == null) return null;

  const isAlwaysOpen = Boolean(
    bookmark.availability?.reason &&
    ALWAYS_OPEN_REASONS.has(bookmark.availability.reason)
  );

  return {
    id: bookmark.policyId,
    title: bookmark.title ?? '',
    organizationName: bookmark.organizationName ?? '',
    applicationType: isAlwaysOpen ? 'ALWAYS' : 'UNKNOWN',
    applicationStartDate: bookmark.applicationStartDate ?? null,
    applicationEndDate: bookmark.applicationEndDate ?? null,
    availability: bookmark.availability ?? null,
    bookmarked: true,
    // 북마크 응답에는 카테고리·지역이 없어 카드에 칩을 표시하지 않는다.
    categories: [],
    regionScope: null,
    regions: [],
    eligibilityStatus: null,
  };
};
