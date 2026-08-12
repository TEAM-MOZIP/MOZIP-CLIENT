import MessageItem from '@shared/components/chatbot/MessageItem';
import type { ChatMessage } from '@pages/chatbot/types/chat';

type MessageListProps = {
  messages: ChatMessage[];
  className?: string;
  compact?: boolean;
};

const MessageList = ({
  messages,
  className = 'gap-[4rem]',
  compact = false,
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
        />
      ))}
    </div>
  );
};

export default MessageList;
