import MessageInput from '@shared/components/chatbot/MessageInput';
import heroWatermark from '@shared/assets/hero-watermark.svg';

type ChatEmptyStateProps = {
  onSubmit?: (message: string) => void;
};

const ChatEmptyState = ({ onSubmit }: ChatEmptyStateProps) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white bg-gradient-to-b from-white from-30% to-primary-sub-2/50 px-[4rem]">
      <img
        src={heroWatermark}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 w-full"
        draggable={false}
      />

      <div className="relative flex w-full max-w-[80rem] flex-col items-center gap-[5.2rem]">
        <p className="text-center text-heading-3 font-medium text-gray-800">
          궁금한 정책을 <span className="font-semibold">MOZIP AI</span>
          에게 물어보세요
        </p>
        <MessageInput onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default ChatEmptyState;
