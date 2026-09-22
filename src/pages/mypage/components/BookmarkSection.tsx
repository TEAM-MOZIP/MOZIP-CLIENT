import { useState } from 'react';
import PolicyCard from '@pages/package/components/PolicyCard';
import { useGetMyBookmarks } from '@pages/mypage/hooks/useGetMyBookmarks';
import { useRemoveBookmark } from '@pages/mypage/hooks/useRemoveBookmark';
import {
  mapBookmarkToCardItem,
  type BookmarkCardItem,
} from '@pages/mypage/utils/mapBookmarkToCard';

const BookmarkSection = () => {
  const { data, isLoading } = useGetMyBookmarks();
  const { mutate: removeBookmark } = useRemoveBookmark();

  const bookmarks: BookmarkCardItem[] =
    data?.content
      ?.map(mapBookmarkToCardItem)
      .filter((item): item is BookmarkCardItem => item != null) ?? [];

  const [removedIds, setRemovedIds] = useState<Set<string>>(new Set());

  const toggleBookmark = (id: string) => {
    if (removedIds.has(id)) return;

    setRemovedIds((prev) => new Set(prev).add(id));

    removeBookmark(id, {
      onError: () => {
        setRemovedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      },
    });
  };

  const visibleBookmarks = bookmarks.filter((item) => !removedIds.has(item.id));

  return (
    <section>
      <h2 className="mb-[2.8rem] text-heading-3 text-gray-800">북마크</h2>
      {isLoading ? null : visibleBookmarks.length === 0 ? (
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
              title={item.title}
              dDay={item.dDay}
              bookmarked={!removedIds.has(item.id)}
              onBookmarkClick={() => toggleBookmark(item.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default BookmarkSection;
