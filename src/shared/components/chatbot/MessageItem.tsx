import type { ChatMessageRole } from '@pages/chatbot/types/chat';

type MessageItemProps = {
  role: ChatMessageRole;
  content: string;
};

const MessageItem = ({ role, content }: MessageItemProps) => {
  const isUser = role === 'user';

  return (
    <div
      className={['flex w-full', isUser ? 'justify-end' : 'justify-start'].join(
        ' '
      )}
    >
      <div
        className={[
          'max-w-[min(68rem,85%)] whitespace-pre-wrap break-words text-body-2 text-gray-800',
          isUser
            ? 'rounded-[2rem] bg-primary-sub-3 px-[1.6rem] py-[1.2rem]'
            : 'p-[0.8rem]',
        ].join(' ')}
      >
        {content}
      </div>
    </div>
  );
};

export default MessageItem;
