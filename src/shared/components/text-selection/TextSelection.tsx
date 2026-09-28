import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import SelectionPopover, {
  type SelectionPopoverPosition,
} from '@shared/components/text-selection/SelectionPopover';
import { useChatPanelStore } from '@shared/stores/useChatPanelStore';

export type TextSelectionAskPayload = {
  selectedText: string;
  context: string;
};

type TextSelectionProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onAskSubmit?: (payload: TextSelectionAskPayload) => void | Promise<void>;
  onSelectionChange?: (selectedText: string | null) => void;
};

type RectLike = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type SelectionState = {
  text: string;
  context: string;
  rect: RectLike;
};

const POPOVER_GAP = 8;
const VIEWPORT_PADDING = 12;
const POPOVER_SIZE = { width: 220, height: 40 };
const CONTEXT_BLOCK_SELECTOR = 'p, li, h1, h2, h3, h4, blockquote, td, div';
const MAX_CONTEXT_LENGTH = 500;

const toRectLike = (rect: DOMRect): RectLike => ({
  top: rect.top,
  left: rect.left,
  width: rect.width,
  height: rect.height,
});

const getRectsFromRange = (
  range: Range
): { rect: RectLike; highlightRects: RectLike[] } => {
  const bounding = toRectLike(range.getBoundingClientRect());
  const highlightRects = Array.from(range.getClientRects())
    .filter((rect) => rect.width > 0 && rect.height > 0)
    .map(toRectLike);

  return {
    rect: bounding,
    highlightRects:
      highlightRects.length > 0
        ? highlightRects
        : bounding.width > 0 || bounding.height > 0
          ? [bounding]
          : [],
  };
};

// 선택한 용어의 문맥(context)을 얻기 위해 가장 가까운 블록 요소의 텍스트를 사용한다.
const getContextFromRange = (range: Range, fallback: HTMLElement): string => {
  const node = range.commonAncestorContainer;
  const element =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as Element)
      : node.parentElement;
  const block = element?.closest(CONTEXT_BLOCK_SELECTOR) as HTMLElement | null;
  const text = (block ?? fallback).textContent ?? '';

  return text.trim().slice(0, MAX_CONTEXT_LENGTH);
};

const isEditableTarget = (node: Node | null) => {
  if (!node) return false;

  const element =
    node.nodeType === Node.ELEMENT_NODE
      ? (node as Element)
      : node.parentElement;

  if (!element) return false;

  return Boolean(
    element.closest('input, textarea, select, [contenteditable="true"]')
  );
};

const isSelectionInside = (
  container: HTMLElement,
  selection: Selection
): boolean => {
  if (selection.rangeCount === 0) return false;

  const range = selection.getRangeAt(0);
  const ancestor = range.commonAncestorContainer;
  const ancestorElement =
    ancestor.nodeType === Node.ELEMENT_NODE
      ? (ancestor as Element)
      : ancestor.parentElement;

  if (!ancestorElement || !container.contains(ancestorElement)) {
    return false;
  }

  return true;
};

const isPopoverTarget = (target: EventTarget | null) =>
  target instanceof Element &&
  Boolean(target.closest('[data-selection-popover="true"]'));

const intersectsRect = (a: RectLike, b: RectLike, minOverlap = 1) => {
  const top = Math.max(a.top, b.top);
  const left = Math.max(a.left, b.left);
  const bottom = Math.min(a.top + a.height, b.top + b.height);
  const right = Math.min(a.left + a.width, b.left + b.width);
  return bottom - top >= minOverlap && right - left >= minOverlap;
};

const getPopoverPosition = (
  rect: RectLike,
  size: { width: number; height: number },
  clip: RectLike
): SelectionPopoverPosition | null => {
  if (!intersectsRect(rect, clip)) return null;

  const clipTop = clip.top + VIEWPORT_PADDING;
  const clipBottom = clip.top + clip.height - VIEWPORT_PADDING;
  const clipLeft = clip.left + VIEWPORT_PADDING;
  const clipRight = clip.left + clip.width - VIEWPORT_PADDING;

  if (clipBottom - clipTop < size.height || clipRight - clipLeft < size.width) {
    return null;
  }

  const halfWidth = size.width / 2;
  const minLeft = clipLeft + halfWidth;
  const maxLeft = clipRight - halfWidth;
  const left = Math.min(
    Math.max(rect.left + rect.width / 2, minLeft),
    Math.max(minLeft, maxLeft)
  );

  const selectionTop = Math.max(rect.top, clip.top);
  const selectionBottom = Math.min(
    rect.top + rect.height,
    clip.top + clip.height
  );
  const spaceAbove = selectionTop - clipTop;
  const spaceBelow = clipBottom - selectionBottom;

  // default: 텍스트 셀렉션 상단(상단 공간이 부족할 때만 하단에 배치)
  if (spaceAbove >= size.height + POPOVER_GAP) {
    return {
      top: selectionTop - POPOVER_GAP,
      left,
      placement: 'top',
    };
  }

  if (spaceBelow >= size.height + POPOVER_GAP) {
    return {
      top: selectionBottom + POPOVER_GAP,
      left,
      placement: 'bottom',
    };
  }

  return {
    top: clipTop + size.height,
    left,
    placement: 'top',
  };
};

const TextSelection = ({
  children,
  className,
  disabled = false,
  onAskSubmit,
  onSelectionChange,
}: TextSelectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isSelectingRef = useRef(false);
  const rangeRef = useRef<Range | null>(null);

  const ask = useChatPanelStore((state) => state.ask);

  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [popoverPosition, setPopoverPosition] =
    useState<SelectionPopoverPosition | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearSelectionState = useCallback(() => {
    rangeRef.current = null;
    setSelection(null);
    setIsInView(true);
    setPopoverPosition(null);
    setIsSubmitting(false);
    onSelectionChange?.(null);
  }, [onSelectionChange]);

  const dismissSelection = useCallback(() => {
    window.getSelection()?.removeAllRanges();
    clearSelectionState();
  }, [clearSelectionState]);

  const updateLayoutFromRange = useCallback((range: Range, text?: string) => {
    const container = containerRef.current;
    if (!container) return false;

    const { rect, highlightRects } = getRectsFromRange(range);
    if (highlightRects.length === 0) return false;

    const clip = toRectLike(container.getBoundingClientRect());
    const inView = intersectsRect(rect, clip);
    const nextPosition = getPopoverPosition(rect, POPOVER_SIZE, clip);

    setIsInView(inView);
    if (nextPosition) {
      setPopoverPosition(nextPosition);
    }

    setSelection((prev) => {
      const nextText = text ?? prev?.text;
      if (!nextText) return prev;

      return {
        text: nextText,
        context:
          text !== undefined
            ? getContextFromRange(range, container)
            : (prev?.context ?? ''),
        rect,
      };
    });

    return true;
  }, []);

  const refreshPersistedRects = useCallback(() => {
    const range = rangeRef.current;
    if (!range) return;

    if (!updateLayoutFromRange(range)) {
      dismissSelection();
    }
  }, [dismissSelection, updateLayoutFromRange]);

  const syncSelection = useCallback(() => {
    if (disabled) return;

    const container = containerRef.current;
    const browserSelection = window.getSelection();

    if (
      !container ||
      !browserSelection ||
      browserSelection.isCollapsed ||
      browserSelection.rangeCount === 0
    ) {
      clearSelectionState();
      return;
    }

    if (!isSelectionInside(container, browserSelection)) {
      clearSelectionState();
      return;
    }

    if (
      isEditableTarget(browserSelection.anchorNode) ||
      isEditableTarget(browserSelection.focusNode)
    ) {
      clearSelectionState();
      return;
    }

    const text = browserSelection.toString().trim();
    if (!text) {
      clearSelectionState();
      return;
    }

    const range = browserSelection.getRangeAt(0).cloneRange();
    const clip = toRectLike(container.getBoundingClientRect());
    const { rect, highlightRects } = getRectsFromRange(range);

    if (highlightRects.length === 0 || !intersectsRect(rect, clip)) {
      clearSelectionState();
      return;
    }

    rangeRef.current = range;

    if (!updateLayoutFromRange(range, text)) {
      clearSelectionState();
      return;
    }

    onSelectionChange?.(text);
  }, [clearSelectionState, disabled, onSelectionChange, updateLayoutFromRange]);

  useEffect(() => {
    if (!disabled) return;

    const frameId = requestAnimationFrame(() => {
      clearSelectionState();
    });

    return () => cancelAnimationFrame(frameId);
  }, [clearSelectionState, disabled]);

  useEffect(() => {
    if (disabled) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (isPopoverTarget(event.target)) return;

      const inContainer = Boolean(
        containerRef.current?.contains(event.target as Node)
      );
      isSelectingRef.current = inContainer;

      if (rangeRef.current) {
        if (!inContainer) {
          window.getSelection()?.removeAllRanges();
        }
        clearSelectionState();
      }
    };

    const handleMouseUp = () => {
      if (!isSelectingRef.current) return;
      isSelectingRef.current = false;
      requestAnimationFrame(() => syncSelection());
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (
        event.key === 'Shift' ||
        event.key.startsWith('Arrow') ||
        event.key === 'a' ||
        event.key === 'A'
      ) {
        syncSelection();
      }
    };

    const handleSelectionChange = () => {
      if (isSelectingRef.current) return;
      syncSelection();
    };

    const handleScrollOrResize = () => {
      if (!rangeRef.current) return;
      refreshPersistedRects();
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('selectionchange', handleSelectionChange);
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('keyup', handleKeyUp);
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [clearSelectionState, disabled, refreshPersistedRects, syncSelection]);

  const handleSubmit = useCallback(async () => {
    if (!selection || isSubmitting) return;

    const payload: TextSelectionAskPayload = {
      selectedText: selection.text,
      context: selection.context,
    };

    setIsSubmitting(true);
    try {
      if (onAskSubmit) {
        await onAskSubmit(payload);
      } else {
        ask(payload.selectedText);
      }
    } finally {
      dismissSelection();
    }
  }, [ask, dismissSelection, isSubmitting, onAskSubmit, selection]);

  const activeSelection = disabled ? null : selection;
  const showOverlay = Boolean(activeSelection && isInView && popoverPosition);

  return (
    <div
      ref={containerRef}
      className={['selection:bg-primary-sub-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      {children}

      {activeSelection &&
        popoverPosition &&
        createPortal(
          <div
            className={
              showOverlay ? undefined : 'invisible pointer-events-none'
            }
            aria-hidden={!showOverlay}
          >
            <SelectionPopover
              position={popoverPosition}
              isLoading={isSubmitting}
              onSubmit={handleSubmit}
              onDismiss={dismissSelection}
            />
          </div>,
          document.body
        )}
    </div>
  );
};

export default TextSelection;
