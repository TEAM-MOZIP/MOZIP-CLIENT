import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ChatLogo from '@shared/components/chatbot/ChatLogo';
import MessageInput from '@shared/components/chatbot/MessageInput';
import MessageList from '@shared/components/chatbot/MessageList';
import type { ChatMessage } from '@pages/chatbot/types/chat';
import fullScreenIcon from '@shared/assets/icons/full-screen.svg';
import deleteIcon from '@shared/assets/icons/delete.svg';
import {
  MOCK_ASSISTANT_REPLY,
  MOCK_FLOATING_CHAT_MESSAGES,
} from '@pages/chatbot/constants/mockChatMessages';

type ChatFloatingPanelProps = {
  onClose: () => void;
  onExpand?: () => void;
};

const ChatFloatingPanel = ({ onClose, onExpand }: ChatFloatingPanelProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>(
    MOCK_FLOATING_CHAT_MESSAGES
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
    };
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      content: MOCK_ASSISTANT_REPLY,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mozip AI"
      className="fixed right-[4rem] bottom-[12rem] z-[101] flex h-[50rem] w-[38rem] flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_0.8rem_2.4rem_rgba(0,0,0,0.12)]"
    >
      <header className="flex shrink-0 items-center justify-between border-b border-gray-200 px-[2rem] py-[1.6rem]">
        <ChatLogo size="sm" />

        <div className="flex items-center gap-[1.2rem]">
          <button
            type="button"
            aria-label="전체 화면"
            onClick={onExpand}
            className="flex size-[2.8rem] cursor-pointer items-center justify-center"
          >
            <img
              src={fullScreenIcon}
              alt=""
              className="size-[2.4rem]"
              draggable={false}
              aria-hidden
            />
          </button>
          <button
            type="button"
            aria-label="닫기"
            onClick={onClose}
            className="flex size-[2.8rem] cursor-pointer items-center justify-center"
          >
            <img
              src={deleteIcon}
              alt=""
              className="size-[2.4rem]"
              draggable={false}
              aria-hidden
            />
          </button>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto px-[2rem] pt-[2rem] pb-[7.2rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <MessageList messages={messages} className="gap-[2rem]" compact />
        </div>

        <footer className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-white/50 to-white px-[2rem] pb-[2rem]">
          <div className="pointer-events-auto">
            <MessageInput onSubmit={handleSendMessage} compact />
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default ChatFloatingPanel;
