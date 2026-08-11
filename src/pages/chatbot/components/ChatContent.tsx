import { useEffect, useRef } from 'react';
import ChatEmptyState from '@pages/chatbot/components/ChatEmptyState';
import ChatSearchPanel from '@pages/chatbot/components/search/ChatSearchPanel';
import MessageInput from '@shared/components/chatbot/MessageInput';
import MessageList from '@shared/components/chatbot/MessageList';
import type { ChatHistory, ChatMessage } from '@pages/chatbot/types/chat';

type ChatContentProps = {
  isSearchOpen?: boolean;
  histories?: ChatHistory[];
  messages?: ChatMessage[];
  onSelectChat?: (id: string) => void;
  onCloseSearch?: () => void;
  onSendMessage?: (message: string) => void;
};

const ChatContent = ({
  isSearchOpen = false,
  histories = [],
  messages = [],
  onSelectChat,
  onCloseSearch,
  onSendMessage,
}: ChatContentProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasMessages = messages.length > 0;

  useEffect(() => {
    if (!hasMessages || !scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, hasMessages]);

  return (
    <div className="relative h-full w-full">
      {!hasMessages ? (
        <ChatEmptyState onSubmit={onSendMessage} />
      ) : (
        <div className="relative h-full w-full bg-white">
          <div
            ref={scrollRef}
            className="h-full overflow-y-auto px-[4rem] pt-[2.4rem] pb-[12rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <div className="mx-auto flex min-h-full w-full max-w-[80rem] flex-col">
              <div className="flex-1">
                <MessageList messages={messages} />
              </div>
              <p className="mt-auto pt-[2.4rem] text-center text-caption text-gray-400">
                답변에 오류가 있을 수 있으니 중요한 정보는 다시 확인해 주세요.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-white/50 to-white px-[4rem] pb-[2.8rem]">
            <div className="pointer-events-auto mx-auto w-full max-w-[80rem]">
              <MessageInput onSubmit={onSendMessage} />
            </div>
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 p-[4rem]">
          <ChatSearchPanel
            histories={histories}
            onSelect={onSelectChat}
            onClose={onCloseSearch}
          />
        </div>
      )}
    </div>
  );
};

export default ChatContent;
