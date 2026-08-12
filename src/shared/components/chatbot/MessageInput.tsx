import { useState, type SubmitEventHandler } from 'react';
import plusIcon from '@shared/assets/icons/plus.svg';
import arrowUpIcon from '@shared/assets/icons/arrow-up.svg';

type MessageInputProps = {
  onSubmit?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
};

const SIZE_STYLES = {
  default: {
    form: 'h-[5.6rem] gap-[1.6rem] px-[2rem]',
    button: 'size-[2.4rem]',
    icon: 'size-[2rem]',
    input: 'text-body-2 placeholder:text-body-3',
  },
  compact: {
    form: 'h-[4.4rem] gap-[1.2rem] px-[1.6rem]',
    button: 'size-[2rem]',
    icon: 'size-[1.6rem]',
    input: 'text-body-3 placeholder:text-caption',
  },
} as const;

const MessageInput = ({
  onSubmit,
  placeholder = '무엇이든 물어보세요',
  disabled = false,
  className,
  compact = false,
}: MessageInputProps) => {
  const [value, setValue] = useState('');
  const styles = SIZE_STYLES[compact ? 'compact' : 'default'];

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
        'flex w-full items-center rounded-full border border-gray-200 bg-white shadow-[0_0.2rem_1.2rem_rgba(0,0,0,0.06)]',
        styles.form,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        aria-label="추가"
        disabled={disabled}
        className={[
          'flex shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30',
          styles.button,
        ].join(' ')}
      >
        <img
          src={plusIcon}
          alt=""
          className={styles.icon}
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
          className={[
            'w-full text-gray-800 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed',
            styles.input,
          ].join(' ')}
        />
      </label>

      <button
        type="submit"
        aria-label="전송"
        disabled={!canSubmit}
        className={[
          'flex shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30',
          styles.button,
        ].join(' ')}
      >
        <img
          src={arrowUpIcon}
          alt=""
          className={styles.icon}
          draggable={false}
          aria-hidden
        />
      </button>
    </form>
  );
};

export default MessageInput;
