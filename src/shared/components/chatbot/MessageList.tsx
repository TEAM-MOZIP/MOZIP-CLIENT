import MessageItem from '@shared/components/chatbot/MessageItem';
import type { ChatMessage } from '@pages/chatbot/types/chat';

type MessageListProps = {
  messages: ChatMessage[];
  className?: string;
};

const MessageList = ({ messages, className }: MessageListProps) => {
  return (
    <div
      className={['flex w-full flex-col gap-[4rem]', className]
        .filter(Boolean)
        .join(' ')}
      role="log"
      aria-live="polite"
      aria-relevant="additions"
    >
      {messages.map((message) => (
        <MessageItem
          key={message.id}
          role={message.role}
          content={message.content}
        />
      ))}
    </div>
  );
};

export default MessageList;
