import newChatIcon from '@shared/assets/icons/new-chat.svg';
import searchIcon from '@shared/assets/icons/search-darkgray.svg';

type ChatActionsProps = {
  collapsed?: boolean;
  onNewChat?: () => void;
  onSearch?: () => void;
};

const ChatActions = ({
  collapsed = false,
  onNewChat,
  onSearch,
}: ChatActionsProps) => {
  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-[0.8rem]">
        <button
          type="button"
          onClick={onNewChat}
          aria-label="새 채팅"
          className="flex size-[4rem] cursor-pointer items-center justify-center rounded-[0.8rem] transition-colors hover:bg-gray-100"
        >
          <img
            src={newChatIcon}
            alt=""
            className="size-[2.4rem]"
            draggable={false}
            aria-hidden
          />
        </button>
        <button
          type="button"
          onClick={onSearch}
          aria-label="채팅 검색"
          className="flex size-[4rem] cursor-pointer items-center justify-center rounded-[0.8rem] transition-colors hover:bg-gray-100"
        >
          <img
            src={searchIcon}
            alt=""
            className="size-[2.4rem]"
            draggable={false}
            aria-hidden
          />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[0.8rem]">
      <button
        type="button"
        onClick={onNewChat}
        className="flex w-full cursor-pointer items-center gap-[1rem] rounded-[0.8rem] p-[0.8rem] transition-colors hover:bg-gray-100"
      >
        <img
          src={newChatIcon}
          alt=""
          className="size-[2.4rem] shrink-0"
          draggable={false}
          aria-hidden
        />
        <span className="text-body-3 font-medium text-gray-800">새 채팅</span>
      </button>

      <button
        type="button"
        onClick={onSearch}
        className="flex w-full cursor-pointer items-center gap-[1rem] rounded-[0.8rem] p-[0.8rem] transition-colors hover:bg-gray-100"
      >
        <img
          src={searchIcon}
          alt=""
          className="size-[2.4rem] shrink-0"
          draggable={false}
          aria-hidden
        />
        <span className="text-body-3 font-medium text-gray-800">채팅 검색</span>
      </button>
    </div>
  );
};

export default ChatActions;
