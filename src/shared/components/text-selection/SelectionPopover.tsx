import { useEffect } from 'react';
import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';

export type SelectionPopoverPosition = {
  top: number;
  left: number;
  placement: 'top' | 'bottom';
};

type SelectionPopoverProps = {
  position: SelectionPopoverPosition;
  isLoading?: boolean;
  onSubmit: () => void;
  onDismiss: () => void;
};

const SelectionPopover = ({
  position,
  isLoading = false,
  onSubmit,
  onDismiss,
}: SelectionPopoverProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      event.stopPropagation();
      onDismiss();
    };

    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [onDismiss]);

  const transform =
    position.placement === 'top'
      ? 'translate(-50%, -100%)'
      : 'translate(-50%, 0)';

  return (
    <div
      role="dialog"
      aria-label="선택한 텍스트 설명 요청"
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
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className="flex cursor-pointer items-center gap-[0.4rem] rounded-[1.4rem] border border-gray-200 bg-white px-[0.8rem] py-[0.6rem] font-normal text-tag text-gray-800 shadow-[0_0_0.5rem_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-70"
      >
        <img
          src={mozipAiIcon}
          alt=""
          className="size-[2rem] shrink-0"
          draggable={false}
          aria-hidden
        />
        {isLoading ? '설명을 준비하는 중...' : '이 표현 설명받기'}
      </button>
    </div>
  );
};

export default SelectionPopover;
