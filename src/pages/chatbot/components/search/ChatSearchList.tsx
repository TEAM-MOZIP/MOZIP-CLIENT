import ChatSearchItem from '@pages/chatbot/components/search/ChatSearchItem';
import type { ChatHistory } from '@pages/chatbot/types/chat';

type ChatSearchListProps = {
  items: ChatHistory[];
  onSelect?: (id: string) => void;
};

const ChatSearchList = ({ items, onSelect }: ChatSearchListProps) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-body-3 text-gray-500">검색 결과가 없습니다</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-[0.4rem]">
      {items.map((item) => (
        <ChatSearchItem
          key={item.id}
          title={item.title}
          timestamp={item.timestamp}
          onClick={() => onSelect?.(item.id)}
        />
      ))}
    </ul>
  );
};

export default ChatSearchList;
