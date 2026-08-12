import type { ComponentProps } from 'react';
import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';
import mozipAiWhiteIcon from '@shared/assets/icons/mozip-ai-white.svg';

type ChatFloatingButtonProps = ComponentProps<'button'>;

const ChatFloatingButton = ({
  type = 'button',
  className,
  ...props
}: ChatFloatingButtonProps) => {
  return (
    <button
      type={type}
      aria-label="Mozip AI"
      className={[
        'group inline-flex h-[5.6rem] w-[5.6rem] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-primary',
        'shadow-[0_0.4rem_1.2rem_rgba(0,0,0,0.15)] ring-1 ring-transparent',
        'transition-[width,background-color,gap,padding,box-shadow,ring-color] duration-300 ease-in-out',
        'hover:w-[14rem] hover:justify-start hover:gap-[0.8rem] hover:bg-white hover:px-[1rem] hover:ring-primary',
        'focus-visible:w-[14rem] focus-visible:justify-start focus-visible:gap-[0.8rem] focus-visible:bg-white focus-visible:px-[1rem] focus-visible:ring-primary focus-visible:outline-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <span className="relative size-[3.6rem] shrink-0">
        <img
          src={mozipAiWhiteIcon}
          alt=""
          className="absolute inset-0 size-full transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
          draggable={false}
          aria-hidden
        />
        <img
          src={mozipAiIcon}
          alt=""
          className="absolute inset-0 size-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
          draggable={false}
          aria-hidden
        />
      </span>
      <span
        className={[
          'max-w-0 overflow-hidden whitespace-nowrap text-button-1 text-gray-800 opacity-0',
          'transition-[max-width,opacity] duration-300 ease-in-out',
          'group-hover:max-w-[10rem] group-hover:opacity-100',
          'group-focus-visible:max-w-[10rem] group-focus-visible:opacity-100',
        ].join(' ')}
      >
        Mozip AI
      </span>
    </button>
  );
};

export default ChatFloatingButton;
