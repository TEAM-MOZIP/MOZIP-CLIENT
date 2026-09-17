import {
  useEffect,
  useId,
  useRef,
  useState,
  type SubmitEventHandler,
  type KeyboardEventHandler,
} from 'react';
import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';
import arrowUpIcon from '@shared/assets/icons/arrow-up.svg';

export type SelectionPopoverPosition = {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
};

type SelectionPopoverProps = {
  selectedText: string;
  position: SelectionPopoverPosition;
  onAskStart?: () => void;
  onAskCancel?: () => void;
  onSubmit: (question: string) => void;
  onDismiss: () => void;
};

const SelectionPopover = ({
  position,
  onAskStart,
  onAskCancel,
  onSubmit,
  onDismiss,
}: SelectionPopoverProps) => {
  const [mode, setMode] = useState<'action' | 'input'>('action');
  const [question, setQuestion] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const inputId = useId();
  const trimmedQuestion = question.trim();
  const canSubmit = trimmedQuestion.length > 0;

  useEffect(() => {
    if (mode !== 'input') return;
    inputRef.current?.focus();
  }, [mode]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      event.preventDefault();
      event.stopPropagation();

      if (mode === 'input') {
        setMode('action');
        setQuestion('');
        onAskCancel?.();
        return;
      }

      onDismiss();
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [mode, onAskCancel, onDismiss]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!canSubmit) return;
    onSubmit(trimmedQuestion);
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
    if (!canSubmit) return;
    onSubmit(trimmedQuestion);
  };

  const transform =
    position.placement === 'top'
      ? 'translate(-50%, -100%)'
      : 'translate(-50%, 0)';

  return (
    <div
      role="dialog"
      aria-label="선택한 텍스트에 대해 Mozip AI에게 질문"
      aria-modal="false"
      data-selection-popover="true"
      style={{
        top: position.top,
        left: position.left,
        transform,
      }}
      className="fixed z-[110]"
      onMouseDown={(event) => event.preventDefault()}
    >
      {mode === 'action' ? (
        <button
          type="button"
          onClick={() => {
            setMode('input');
            onAskStart?.();
          }}
          className="flex cursor-pointer items-center gap-[0.4rem] rounded-[1.4rem] border border-gray-200 bg-white px-[0.8rem] py-[0.6rem] font-normal text-tag text-gray-800 shadow-[0_0_0.5rem_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-100 focus-visible:outline-none"
        >
          <img
            src={mozipAiIcon}
            alt=""
            className="size-[2rem] shrink-0"
            draggable={false}
            aria-hidden
          />
          Mozip AI에게 물어보세요
        </button>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex w-[min(30rem,calc(100vw-2.4rem))] items-center gap-[0.8rem] rounded-full border border-gray-200 bg-white px-[1.6rem] py-[1rem] shadow-[0_0_1rem_rgba(0,0,0,0.08)]"
        >
          <textarea
            id={inputId}
            ref={inputRef}
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            placeholder="무엇이든 물어보세요"
            className="flex-1 resize-none bg-transparent text-body-3 leading-[2rem] text-gray-800 outline-none placeholder:text-caption placeholder:text-gray-500"
          />

          <button
            type="submit"
            aria-label="질문 전송"
            disabled={!canSubmit}
            className="flex size-[2rem] shrink-0 cursor-pointer items-center justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            <img
              src={arrowUpIcon}
              alt=""
              className="size-[1.6rem]"
              draggable={false}
              aria-hidden
            />
          </button>
        </form>
      )}
    </div>
  );
};

export default SelectionPopover;
