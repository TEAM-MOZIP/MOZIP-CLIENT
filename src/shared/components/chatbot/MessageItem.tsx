import type { ChatMessageRole } from '@pages/chatbot/types/chat';

type MessageItemProps = {
  role: ChatMessageRole;
  content: string;
  compact?: boolean;
};

const MessageItem = ({ role, content, compact = false }: MessageItemProps) => {
  const isUser = role === 'user';

  return (
    <div
      className={['flex w-full', isUser ? 'justify-end' : 'justify-start'].join(
        ' '
      )}
    >
      <div
        className={[
          'max-w-[min(68rem,85%)] whitespace-pre-wrap break-words text-gray-800',
          compact ? 'text-body-3' : 'text-body-2',
          isUser
            ? 'rounded-[2rem] bg-primary-sub-3 px-[1.6rem] py-[1.2rem]'
            : compact
              ? 'rounded-[2rem] bg-gray-100 px-[1.6rem] py-[1.2rem]'
              : 'p-[0.8rem]',
        ].join(' ')}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageItem;
