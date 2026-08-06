import { useState } from 'react';
import ChatLogo from '@shared/components/chatbot/ChatLogo';
import ChatActions from '@pages/chatbot/components/sidebar/ChatActions';
import ChatHistoryList from '@pages/chatbot/components/sidebar/ChatHistoryList';
import type { ChatHistory } from '@pages/chatbot/types/chat';
import sidebarIcon from '@shared/assets/icons/sidebar.svg';
import { MOCK_CHAT_HISTORY } from '@pages/chatbot/constants/mockChatHistory';

type ChatSidebarProps = {
  defaultOpen?: boolean;
  histories?: ChatHistory[];
  onNewChat?: () => void;
  onSearch?: () => void;
  onSelectChat?: (id: string) => void;
};

const ChatSidebar = ({
  defaultOpen = true,
  histories = MOCK_CHAT_HISTORY,
  onNewChat,
  onSearch,
  onSelectChat,
}: ChatSidebarProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleSelectChat = (id: string) => {
    setActiveId(id);
    onSelectChat?.(id);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  if (!isOpen) {
    return (
      <aside
        className="flex h-full w-[6.8rem] shrink-0 flex-col items-start border-r border-gray-200 bg-white px-[1.4rem] py-[2rem]"
        aria-label="채팅 사이드바"
      >
        <button
          type="button"
          onClick={handleToggle}
          aria-label="사이드바 열기"
          className="group relative flex size-[4rem] cursor-pointer items-center justify-start rounded-[0.8rem] transition-colors hover:bg-gray-100"
        >
          <ChatLogo
            showLabel={false}
            size="md"
            className="ml-[0.2rem] transition-opacity group-hover:opacity-0"
          />
          <img
            src={sidebarIcon}
            alt=""
            className="absolute left-1/2 top-1/2 size-[2.4rem] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100"
            draggable={false}
            aria-hidden
          />
        </button>

        <div className="mt-[2.4rem]">
          <ChatActions collapsed onNewChat={onNewChat} onSearch={onSearch} />
        </div>
      </aside>
    );
  }

  return (
    <aside
      className="flex h-full w-[30rem] shrink-0 flex-col border-r border-gray-200 bg-white px-[1.4rem] py-[2rem]"
      aria-label="채팅 사이드바"
    >
      <div className="flex items-center justify-between gap-[1.2rem]">
        <ChatLogo size="md" className="ml-[0.2rem]" />
        <button
          type="button"
          onClick={handleToggle}
          aria-label="사이드바 닫기"
          className="flex size-[4rem] shrink-0 cursor-pointer items-center justify-center rounded-[0.6rem] transition-colors hover:bg-gray-100"
        >
          <img
            src={sidebarIcon}
            alt=""
            className="size-[2.4rem]"
            draggable={false}
            aria-hidden
          />
        </button>
      </div>

      <div className="mt-[2.4rem]">
        <ChatActions onNewChat={onNewChat} onSearch={onSearch} />
      </div>

      <div className="mt-[1.8rem] flex min-h-0 flex-1 flex-col border-t border-gray-200">
        <div className="min-h-0 flex-1 overflow-y-auto pt-[1.8rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ChatHistoryList
            items={histories}
            activeId={activeId}
            onSelect={handleSelectChat}
          />
        </div>
      </div>
    </aside>
  );
};

export default ChatSidebar;
