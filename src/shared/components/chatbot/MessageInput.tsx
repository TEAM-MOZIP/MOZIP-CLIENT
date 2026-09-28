import {
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
  type CompositionEventHandler,
  type KeyboardEventHandler,
  type SubmitEventHandler,
} from 'react';
import plusIcon from '@shared/assets/icons/plus.svg';
import arrowUpIcon from '@shared/assets/icons/arrow-up.svg';

type MessageInputProps = {
  onSubmit?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  compact?: boolean;
};

const MAX_LINES = 4;

const SIZE_STYLES = {
  default: {
    form: 'h-[5.6rem] gap-[1.6rem] px-[2rem]',
    formMultiline: 'gap-[1rem] rounded-[2rem] px-[2rem] py-[1.6rem]',
    buttonPx: 24,
    singleLineGapPx: 16,
    button: 'size-[2.4rem]',
    icon: 'size-[2rem]',
    input: 'text-body-2 placeholder:text-body-3',
    singleLineLeading: 'leading-[2.4rem]',
  },
  compact: {
    form: 'h-[4.4rem] gap-[1.2rem] px-[1.6rem]',
    formMultiline: 'gap-[1rem] rounded-[1.6rem] px-[1.6rem] py-[1.2rem]',
    buttonPx: 20,
    singleLineGapPx: 12,
    button: 'size-[2rem]',
    icon: 'size-[1.6rem]',
    input: 'text-body-3 placeholder:text-caption',
    singleLineLeading: 'leading-[2rem]',
  },
} as const;

const getSingleLineTextareaWidth = (
  form: HTMLFormElement,
  buttonPx: number,
  singleLineGapPx: number
) => {
  const formStyle = getComputedStyle(form);
  const horizontalPadding =
    Number.parseFloat(formStyle.paddingLeft) +
    Number.parseFloat(formStyle.paddingRight);
  const wide = form.clientWidth - horizontalPadding;
  const buttonsWidth = buttonPx * 2;
  const singleLineGaps = singleLineGapPx * 2;

  return Math.max(wide - buttonsWidth - singleLineGaps, 0);
};

const getTextareaWidths = (
  form: HTMLFormElement,
  textarea: HTMLTextAreaElement,
  isMultiline: boolean,
  buttonPx: number,
  singleLineGapPx: number
) => {
  const formStyle = getComputedStyle(form);
  const horizontalPadding =
    Number.parseFloat(formStyle.paddingLeft) +
    Number.parseFloat(formStyle.paddingRight);
  const wide = form.clientWidth - horizontalPadding;

  if (!isMultiline) {
    return {
      narrow: textarea.offsetWidth,
      wide,
    };
  }

  const buttonsWidth = buttonPx * 2;
  const singleLineGaps = singleLineGapPx * 2;

  return {
    narrow: Math.max(wide - buttonsWidth - singleLineGaps, 0),
    wide,
  };
};

const measureScrollHeight = (textarea: HTMLTextAreaElement, width: number) => {
  const previousWidth = textarea.style.width;
  const previousMinHeight = textarea.style.minHeight;
  const previousHeight = textarea.style.height;
  const previousOverflowY = textarea.style.overflowY;

  textarea.style.width = `${width}px`;
  textarea.style.minHeight = '0';
  textarea.style.removeProperty('height');
  textarea.style.overflowY = 'hidden';

  const scrollHeight = textarea.scrollHeight;

  textarea.style.width = previousWidth;
  textarea.style.minHeight = previousMinHeight;
  textarea.style.height = previousHeight;
  textarea.style.overflowY = previousOverflowY;

  return scrollHeight;
};

const MessageInput = ({
  onSubmit,
  placeholder = '무엇이든 물어보세요',
  disabled = false,
  className,
  compact = false,
}: MessageInputProps) => {
  const [value, setValue] = useState('');
  const [isMultiline, setIsMultiline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isMultilineRef = useRef(false);
  const isComposingRef = useRef(false);
  const styles = SIZE_STYLES[compact ? 'compact' : 'default'];

  const trimmedValue = value.trim();
  const canSubmit = !disabled && trimmedValue.length > 0;

  const updateLayout = useCallback(() => {
    const textarea = textareaRef.current;
    const form = formRef.current;
    if (!textarea || !form) return;

    const lineHeight = Number.parseFloat(getComputedStyle(textarea).lineHeight);
    const maxHeight = lineHeight * MAX_LINES;
    const hasNewline = value.includes('\n');
    const wasMultiline = isMultilineRef.current;

    if (!value.trim()) {
      if (wasMultiline) {
        isMultilineRef.current = false;
        setIsMultiline(false);
      }

      textarea.style.removeProperty('height');
      textarea.style.overflowY = 'hidden';
      return;
    }

    let nextIsMultiline = wasMultiline;

    if (hasNewline) {
      nextIsMultiline = true;
    } else {
      const singleLineWidth = getSingleLineTextareaWidth(
        form,
        styles.buttonPx,
        styles.singleLineGapPx
      );
      const narrowScrollHeight = measureScrollHeight(textarea, singleLineWidth);
      const overflowsSingleLine =
        Math.ceil(narrowScrollHeight / lineHeight) > 1;

      if (!nextIsMultiline && overflowsSingleLine) {
        nextIsMultiline = true;
      } else if (nextIsMultiline && !overflowsSingleLine) {
        nextIsMultiline = false;
      }
    }

    if (nextIsMultiline !== wasMultiline) {
      isMultilineRef.current = nextIsMultiline;
      setIsMultiline(nextIsMultiline);
      return;
    }

    const { narrow: nextNarrow, wide: nextWide } = getTextareaWidths(
      form,
      textarea,
      nextIsMultiline,
      styles.buttonPx,
      styles.singleLineGapPx
    );
    const measureWidth = nextIsMultiline ? nextWide : nextNarrow;
    const contentHeight = measureScrollHeight(textarea, measureWidth);
    const nextHeight = Math.min(contentHeight, maxHeight);

    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY = contentHeight > maxHeight ? 'auto' : 'hidden';
  }, [value, compact]);

  useLayoutEffect(() => {
    if (isComposingRef.current) return;
    updateLayout();
  }, [value, compact, isMultiline, updateLayout]);

  useLayoutEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const resizeObserver = new ResizeObserver(() => {
      if (isComposingRef.current) return;
      updateLayout();
    });

    resizeObserver.observe(form);

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateLayout]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    onSubmit?.(trimmedValue);
    setValue('');
    isMultilineRef.current = false;
    setIsMultiline(false);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if (
      event.key !== 'Enter' ||
      event.shiftKey ||
      event.nativeEvent.isComposing
    ) {
      return;
    }

    event.preventDefault();
    formRef.current?.requestSubmit();
  };

  const handleCompositionStart: CompositionEventHandler<
    HTMLTextAreaElement
  > = () => {
    isComposingRef.current = true;
  };

  const handleCompositionEnd: CompositionEventHandler<
    HTMLTextAreaElement
  > = () => {
    isComposingRef.current = false;
    updateLayout();
  };

  const textareaClassName = [
    'w-full min-h-0 resize-none bg-transparent text-gray-800 outline-none transition-[height] duration-[100ms] ease-out placeholder:text-gray-500 disabled:cursor-not-allowed',
    styles.input,
    isMultiline
      ? ''
      : `min-w-0 flex-1 ${styles.singleLineLeading} placeholder:leading-[inherit]`,
  ].join(' ');

  const plusButton = (
    <button
      type="button"
      aria-label="추가"
      disabled={disabled}
      className={[
        'flex shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30',
        styles.button,
        isMultiline ? '' : 'order-1',
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
  );

  const sendButton = (
    <button
      type="submit"
      aria-label="전송"
      disabled={!canSubmit}
      className={[
        'flex shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-30',
        styles.button,
        isMultiline ? '' : 'order-3',
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
  );

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={[
        'flex w-full border border-gray-200 bg-white shadow-[0_0.2rem_1.2rem_rgba(0,0,0,0.06)]',
        isMultiline
          ? `flex-col ${styles.formMultiline}`
          : `items-center rounded-full ${styles.form}`,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className={[
          textareaClassName,
          isMultiline ? 'order-1' : 'order-2',
        ].join(' ')}
      />

      {isMultiline ? (
        <div className="order-2 flex w-full items-center justify-between">
          {plusButton}
          {sendButton}
        </div>
      ) : (
        <>
          {plusButton}
          {sendButton}
        </>
      )}
    </form>
  );
};

export default MessageInput;
