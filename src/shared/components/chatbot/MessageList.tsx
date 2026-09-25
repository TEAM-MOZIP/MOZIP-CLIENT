import MessageItem from '@shared/components/chatbot/MessageItem';
import type { ChatMessage } from '@pages/chatbot/types/chat';

type MessageListProps = {
  messages: ChatMessage[];
  className?: string;
  compact?: boolean;
  isSending?: boolean;
  /** 챗봇 전송이 아닌 대기(예: 용어 설명)를 문구로 보여줄 때 */
  pendingLabel?: string;
  /** 빠른 선택·후속 질문 칩을 눌렀을 때 보낼 메시지 */
  onSendMessage?: (message: string) => void;
};

const PendingMessage = ({ label }: { label: string }) => (
  <div className="flex w-full justify-start" role="status" aria-live="polite">
    <p className="flex items-center gap-[0.6rem] text-body-3 text-gray-500">
      {label}
      <span aria-hidden className="flex items-end gap-[0.3rem]">
        {['0s', '0.15s', '0.3s'].map((delay) => (
          <span
            key={delay}
            className="size-[0.4rem] rounded-full bg-gray-400 motion-safe:animate-bounce"
            style={{ animationDelay: delay }}
          />
        ))}
      </span>
    </p>
  </div>
);

const MessageSkeleton = () => (
  <div className="flex w-full justify-start" aria-busy="true" aria-label="로딩">
    <div className="flex w-full max-w-[min(68rem,85%)] flex-col items-start gap-[0.8rem]">
      <div className="h-[3.2rem] w-[60%] rounded-[1.2rem] bg-gray-200 animate-pulse" />
    </div>
  </div>
);

const MessageList = ({
  messages,
  className = 'gap-[4rem]',
  compact = false,
  isSending = false,
  pendingLabel,
  onSendMessage,
}: MessageListProps) => {
  const lastIndex = messages.length - 1;
  return (
    <div
      className={['flex w-full flex-col', className].filter(Boolean).join(' ')}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((message, index) => {
        const isLatest = index === lastIndex;
        return (
          <MessageItem
            key={message.id}
            role={message.role}
            content={message.content}
            compact={compact}
            matchedPolicies={message.matchedPolicies}
            blocks={message.blocks}
            followUps={message.followUps}
            showFollowUps={isLatest}
            interactive={isLatest && !isSending && Boolean(onSendMessage)}
            onSendMessage={onSendMessage}
          />
        );
      })}
      {isSending && <MessageSkeleton />}
      {pendingLabel && <PendingMessage label={pendingLabel} />}
    </div>
  );
};

export default MessageList;
