import type { BookmarkResponse } from '@shared/apis/generated/Api';
import type { PolicyListItem } from '@pages/package/types/package';
import { toCategories, toRegions } from '@pages/package/utils/toPolicyListItem';

// 예전 응답처럼 applicationType이 없으면 availability.reason으로
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
    applicationType:
      bookmark.applicationType ?? (isAlwaysOpen ? 'ALWAYS' : 'UNKNOWN'),
    applicationStartDate: bookmark.applicationStartDate ?? null,
    applicationEndDate: bookmark.applicationEndDate ?? null,
    availability: bookmark.availability ?? null,
    bookmarked: true,
    // 정책 목록 카드와 같은 칩(카테고리·지역·연령)을 보여준다.
    categories: toCategories(bookmark.categories),
    regionScope: bookmark.regionScope ?? null,
    regions: toRegions(bookmark.regions),
    // 자격 판정은 맞춤 추천 목록에서만 계산하므로 북마크 카드엔 없다.
    eligibilityStatus: null,
    ageRange: {
      min: bookmark.minimumAge ?? null,
      max: bookmark.maximumAge ?? null,
    },
  };
};
