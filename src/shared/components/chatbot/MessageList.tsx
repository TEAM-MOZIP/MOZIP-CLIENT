import MessageItem from '@shared/components/chatbot/MessageItem';
import type { ChatMessage } from '@pages/chatbot/types/chat';

type MessageListProps = {
  messages: ChatMessage[];
  className?: string;
  compact?: boolean;
  isSending?: boolean;
};

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
}: MessageListProps) => {
  return (
    <div
      className={['flex w-full flex-col', className].filter(Boolean).join(' ')}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          role={message.role}
          content={message.content}
          compact={compact}
          matchedPolicies={message.matchedPolicies}
        />
      ))}
      {isSending && <MessageSkeleton />}
    </div>
  );
};

export default MessageList;
