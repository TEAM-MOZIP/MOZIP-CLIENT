import { useState, type SubmitEventHandler } from 'react';
import plusIcon from '@shared/assets/icons/plus.svg';
import arrowUpIcon from '@shared/assets/icons/arrow-up.svg';

type MessageInputProps = {
  onSubmit?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

const MessageInput = ({
  onSubmit,
  placeholder = '무엇이든 물어보세요',
  disabled = false,
  className,
}: MessageInputProps) => {
  const [value, setValue] = useState('');

  const trimmedValue = value.trim();
  const canSubmit = !disabled && trimmedValue.length > 0;

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    onSubmit?.(trimmedValue);
    setValue('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={[
        'flex h-[5.6rem] w-full items-center gap-[1.6rem] rounded-full border border-gray-200 bg-white px-[2rem] shadow-[0_0.2rem_1.2rem_rgba(0,0,0,0.06)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        aria-label="추가"
        disabled={disabled}
        className="flex size-[2.4rem] shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
      >
        <img
          src={plusIcon}
          alt=""
          className="size-[2rem]"
          draggable={false}
          aria-hidden
        />
      </button>

      <label className="min-w-0 flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full text-body-2 text-gray-800 outline-none placeholder:text-body-3 placeholder:text-gray-500 disabled:cursor-not-allowed"
        />
      </label>

      <button
        type="submit"
        aria-label="전송"
        disabled={!canSubmit}
        className="flex size-[2.4rem] shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30"
      >
        <img
          src={arrowUpIcon}
          alt=""
          className="size-[2rem]"
          draggable={false}
          aria-hidden
        />
      </button>
    </form>
  );
};

export default MessageInput;
