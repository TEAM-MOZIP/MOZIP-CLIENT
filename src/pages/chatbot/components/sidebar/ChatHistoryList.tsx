import ChatHistoryItem from '@pages/chatbot/components/sidebar/ChatHistoryItem';
import type { ChatHistory } from '@pages/chatbot/types/chat';

type ChatHistoryListProps = {
  items: ChatHistory[];
  activeId?: string | null;
  onSelect?: (id: string) => void;
  onMenuClick?: (id: string) => void;
};

const ChatHistoryList = ({
  items,
  activeId,
  onSelect,
  onMenuClick,
}: ChatHistoryListProps) => {
  return (
    <ul className="flex flex-col gap-[0.8rem]">
      {items.map((item) => (
        <ChatHistoryItem
          key={item.id}
          title={item.title}
          isActive={item.id === activeId}
          onClick={() => onSelect?.(item.id)}
          onMenuClick={() => onMenuClick?.(item.id)}
        />
      ))}
    </ul>
  );
};

export default ChatHistoryList;
