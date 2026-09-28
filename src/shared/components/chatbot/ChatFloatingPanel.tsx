import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import ChatLogo from '@shared/components/chatbot/ChatLogo';
import MessageInput from '@shared/components/chatbot/MessageInput';
import MessageList from '@shared/components/chatbot/MessageList';
import { useChatSession } from '@pages/chatbot/hooks/useChatSession';
import { useChatPanelStore } from '@shared/stores/useChatPanelStore';
import fullScreenIcon from '@shared/assets/icons/full-screen.svg';
import deleteIcon from '@shared/assets/icons/delete.svg';

type ChatFloatingPanelProps = {
  onClose: () => void;
  onExpand?: () => void;
};

const ChatFloatingPanel = ({ onClose, onExpand }: ChatFloatingPanelProps) => {
  const { messages, sendMessage, appendMessage, isSending } = useChatSession();
  const pendingMessage = useChatPanelStore((state) => state.pendingMessage);
  const pendingExchange = useChatPanelStore((state) => state.pendingExchange);
  const clearPendingMessage = useChatPanelStore(
    (state) => state.clearPendingMessage
  );
  const clearPendingExchange = useChatPanelStore(
    (state) => state.clearPendingExchange
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const shownQuestionIdRef = useRef<string | null>(null);
  // 용어 설명처럼 답변을 기다리는 중인 교환이 있으면 "설명하는 중"을 띄운다.
  const isExplaining =
    pendingExchange !== null && pendingExchange.answer === null;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isSending, isExplaining]);

  useEffect(() => {
    const message = useChatPanelStore.getState().pendingMessage;
    if (!message || isSending) return;

    clearPendingMessage();
    sendMessage(message);
  }, [pendingMessage, isSending, sendMessage, clearPendingMessage]);

  useEffect(() => {
    const exchange = useChatPanelStore.getState().pendingExchange;
    if (!exchange) return;

    // 질문은 교환이 시작되자마자 한 번만 띄우고, 답변은 도착했을 때 이어 붙인다.
    if (shownQuestionIdRef.current !== exchange.id) {
      shownQuestionIdRef.current = exchange.id;
      appendMessage('user', exchange.question);
    }
    if (exchange.answer === null) return;

    clearPendingExchange();
    appendMessage('assistant', exchange.answer);
  }, [pendingExchange, appendMessage, clearPendingExchange]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (
        target instanceof Element &&
        (target.closest('[data-selection-popover="true"]') ||
          target.closest('[data-chat-floating="true"]') ||
          target.closest('[data-chat-coexist="true"]'))
      ) {
        return;
      }

      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopImmediatePropagation();
      onClose();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="MOZIP AI"
      data-chat-floating="true"
      className="fixed right-[4rem] bottom-[12rem] z-[200] flex h-[50rem] w-[38rem] flex-col overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-[0_0.8rem_2.4rem_rgba(0,0,0,0.12)]"
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
          className="h-full overflow-y-auto px-[2.2rem] pt-[1.6rem] pb-[8.4rem] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <MessageList
            messages={messages}
            className="gap-[2.4rem]"
            compact
            isSending={isSending}
            onSendMessage={sendMessage}
            pendingLabel={
              isExplaining ? 'MOZIP AI가 용어를 찾고 있어요.' : undefined
            }
          />
        </div>

        <footer className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-white/50 to-white px-[2rem] pb-[2rem]">
          <div className="pointer-events-auto">
            <MessageInput onSubmit={sendMessage} compact disabled={isSending} />
          </div>
        </footer>
      </div>
    </div>,
    document.body
  );
};

export default ChatFloatingPanel;
