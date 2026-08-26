import { useState } from 'react';
import PolicyCard from '@pages/package/components/PolicyCard';
import type { PolicyItem } from '@pages/package/types';

type BookmarkSectionProps = {
  bookmarks: PolicyItem[];
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
            <PolicyCard
              key={item.id}
              {...item}
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
