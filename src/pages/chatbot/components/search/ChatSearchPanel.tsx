import { useEffect, useMemo, useRef, useState } from 'react';
import ChatSearchList from '@pages/chatbot/components/search/ChatSearchList';
import type { ChatHistory } from '@pages/chatbot/types/chat';
import deleteIcon from '@shared/assets/icons/delete.svg';

type ChatSearchPanelProps = {
  histories: ChatHistory[];
  onSelect?: (id: string) => void;
  onClose?: () => void;
};

const ChatSearchPanel = ({
  histories,
  onSelect,
  onClose,
}: ChatSearchPanelProps) => {
  const [query, setQuery] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);

  const filteredHistories = useMemo(() => {
    const sorted = [...histories].reverse();

    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return sorted;
    }

    return sorted.filter((item) =>
      item.title.toLowerCase().includes(trimmedQuery.toLowerCase())
    );
  }, [histories, query]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="flex h-[min(52rem,100%)] w-[min(72rem,100%)] flex-col rounded-[2rem] p-[2.4rem] border border-gray-200 bg-white shadow-[0_0.4rem_2rem_rgba(0,0,0,0.08)]"
    >
      {' '}
      <label className="relative">
        <span className="sr-only">채팅 검색</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="채팅 검색"
          autoFocus
          className={`h-[4.8rem] w-full rounded-full bg-gray-100 pl-[2rem] text-body-3 text-gray-800 outline-none placeholder:text-gray-400 [&::-webkit-search-cancel-button]:appearance-none ${
            query ? 'pr-[4rem]' : 'pr-[2rem]'
          }`}
        />
        {query && (
          <button
            type="button"
            aria-label="검색어 삭제"
            onClick={() => setQuery('')}
            className="absolute top-1/2 right-[1.6rem] -translate-y-1/2 cursor-pointer"
          >
            <img
              src={deleteIcon}
              alt=""
              className="size-[1.8rem]"
              aria-hidden
              draggable={false}
            />
          </button>
        )}
      </label>
      <div className="mt-[2.4rem] flex min-h-0 flex-1 flex-col overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <ChatSearchList items={filteredHistories} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default ChatSearchPanel;
