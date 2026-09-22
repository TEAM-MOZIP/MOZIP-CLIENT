import type { BookmarkResponse } from '@shared/apis/generated/Api';

export type BookmarkCardItem = {
  id: string;
  title: string;
  dDay: number | null;
  bookmarked: boolean;
};

const ALWAYS_OPEN_REASONS = new Set(['ALWAYS_OPEN', 'ALWAYS_APPLICATION_TYPE']);

const MS_PER_DAY = 1000 * 60 * 60 * 24;

const toStartOfDay = (date: Date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

export const calcDDay = (
  applicationEndDate?: string | null,
  reason?: string | null
): number | null => {
  if (reason && ALWAYS_OPEN_REASONS.has(reason)) return null;
  if (!applicationEndDate) return null;

  const end = toStartOfDay(new Date(applicationEndDate));
  if (Number.isNaN(end.getTime())) return null;

  const today = toStartOfDay(new Date());
  return Math.ceil((end.getTime() - today.getTime()) / MS_PER_DAY);
};

export const mapBookmarkToCardItem = (
  bookmark: BookmarkResponse
): BookmarkCardItem | null => {
  if (bookmark.policyId == null) return null;

  return {
    id: String(bookmark.policyId),
    title: bookmark.title ?? '',
    dDay: calcDDay(bookmark.applicationEndDate, bookmark.availability?.reason),
    bookmarked: true,
  };
};
