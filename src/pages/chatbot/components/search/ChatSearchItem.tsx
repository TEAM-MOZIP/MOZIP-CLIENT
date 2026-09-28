import { formatDate } from '@shared/utils/formatDate';

type ChatSearchItemProps = {
  title: string;
  timestamp: string;
  onClick?: () => void;
};

const ChatSearchItem = ({ title, timestamp, onClick }: ChatSearchItemProps) => {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full cursor-pointer items-center justify-between gap-[1.2rem] rounded-[0.8rem] px-[0.4rem] py-[0.8rem] text-left transition-colors hover:bg-gray-100"
      >
        <span className="min-w-0 flex-1 truncate text-body-3 text-gray-600">
          {title}
        </span>
        <span className="shrink-0 text-body-3 text-gray-400">
          {formatDate(timestamp)}
        </span>
      </button>
    </li>
  );
};

export default ChatSearchItem;
