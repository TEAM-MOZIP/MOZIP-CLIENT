import kebabMenuIcon from '@shared/assets/icons/kebab-menu.svg';

type ChatHistoryItemProps = {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
  onMenuClick?: () => void;
};

const ChatHistoryItem = ({
  title,
  isActive = false,
  onClick,
  onMenuClick,
}: ChatHistoryItemProps) => {
  return (
    <li>
      <div
        className={[
          'group flex w-full items-center gap-[0.4rem] rounded-[0.8rem] pl-[0.8rem] pr-[0.4rem] py-[0.8rem] transition-colors',
          isActive ? 'bg-gray-100' : 'hover:bg-gray-100',
        ].join(' ')}
      >
        <button
          type="button"
          onClick={onClick}
          className="min-w-0 flex-1 cursor-pointer text-left text-body-3 text-gray-800"
        >
          <span className="block truncate">{title}</span>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMenuClick?.();
          }}
          aria-label="히스토리 메뉴"
          className="flex size-[2.4rem] shrink-0 cursor-pointer items-center justify-center opacity-0 transition-opacity group-hover:opacity-50 hover:opacity-100"
        >
          <img
            src={kebabMenuIcon}
            alt=""
            className="size-[2.2rem]"
            draggable={false}
            aria-hidden
          />
        </button>
      </div>
    </li>
  );
};

export default ChatHistoryItem;
