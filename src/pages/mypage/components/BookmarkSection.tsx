import { useState } from 'react';
import type { PolicyItem } from '@pages/package/types';
import { TAG_STYLES } from '@pages/package/constants/tagStyles';
import bookmarkIcon from '@shared/assets/icons/bookmark.svg';
import bookmarkFilledIcon from '@shared/assets/icons/bookmark-filled.svg';

type BookmarkSectionProps = {
  bookmarks: PolicyItem[];
};

// TODO: 북마크 목록 API(GET /api/bookmarks) 연동 시 실제 응답 모델로 교체.
// 지금은 mock PolicyItem을 그대로 쓰고 있어 pages/package의 실제 PolicyCard와는
// 별개의 임시 카드로 렌더링한다.
const MockBookmarkCard = ({
  item,
  bookmarked,
  onBookmarkClick,
}: {
  item: PolicyItem;
  bookmarked: boolean;
  onBookmarkClick: () => void;
}) => {
  const tags = [
    { kind: 'age' as const, label: item.age },
    { kind: 'category' as const, label: item.category },
    { kind: 'region' as const, label: item.region },
  ];

  return (
    <div className="flex min-w-0 flex-col overflow-hidden rounded-[1rem] border border-gray-400 bg-white p-[2rem] gap-[2rem]">
      <div className="flex items-center justify-between gap-[1rem]">
        <span className="text-body-2 font-medium text-point">
          D-{item.dDay}
        </span>
        <button
          type="button"
          aria-label={bookmarked ? '북마크 해제' : '북마크'}
          aria-pressed={bookmarked}
          onClick={onBookmarkClick}
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

      <h3
        className="text-body-1 font-bold text-title truncate"
        title={item.title}
      >
        {item.title}
      </h3>

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
    </div>
  );
};

const BookmarkSection = ({ bookmarks }: BookmarkSectionProps) => {
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    () =>
      new Set(
        bookmarks.filter((item) => item.bookmarked).map((item) => item.id)
      )
  );

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const visibleBookmarks = bookmarks.filter((item) =>
    bookmarkedIds.has(item.id)
  );

  return (
    <section>
      <h2 className="mb-[2.8rem] text-heading-3 text-gray-800">북마크</h2>
      {visibleBookmarks.length === 0 ? (
        <div className="flex min-h-[8rem] items-center justify-start">
          <p className="text-body-3 text-gray-500">
            아직 북마크 내역이 없습니다.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-[2.4rem] sm:grid-cols-2 xl:grid-cols-3">
          {visibleBookmarks.map((item) => (
            <MockBookmarkCard
              key={item.id}
              item={item}
              bookmarked={bookmarkedIds.has(item.id)}
              onBookmarkClick={() => toggleBookmark(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookmarkSection;
