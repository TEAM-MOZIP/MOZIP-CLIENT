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
  question: string;
};

type TextSelectionProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onAskSubmit?: (payload: TextSelectionAskPayload) => void;
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
  rect: RectLike;
  highlightRects: RectLike[];
};

const buildSelectionAskMessage = (selectedText: string, question: string) => {
  return `"${selectedText.trim()}"\n\n${question.trim()}`;
};

const POPOVER_GAP = 8;
const VIEWPORT_PADDING = 12;
const ACTION_POPOVER_SIZE = { width: 220, height: 40 };
const INPUT_POPOVER_SIZE = { width: 320, height: 44 };

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

const clipRectToBounds = (rect: RectLike, clip: RectLike): RectLike | null => {
  const top = Math.max(rect.top, clip.top);
  const left = Math.max(rect.left, clip.left);
  const bottom = Math.min(rect.top + rect.height, clip.top + clip.height);
  const right = Math.min(rect.left + rect.width, clip.left + clip.width);
  const width = right - left;
  const height = bottom - top;
  if (width <= 0 || height <= 0) return null;
  return { top, left, width, height };
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
  const isAskingRef = useRef(false);
  const persistHighlightRef = useRef(false);

  const ask = useChatPanelStore((state) => state.ask);

  const [selection, setSelection] = useState<SelectionState | null>(null);
  const [persistHighlight, setPersistHighlight] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [popoverPosition, setPopoverPosition] =
    useState<SelectionPopoverPosition | null>(null);

  const clearSelectionState = useCallback(() => {
    rangeRef.current = null;
    isAskingRef.current = false;
    persistHighlightRef.current = false;
    setSelection(null);
    setPersistHighlight(false);
    setIsInView(true);
    setPopoverPosition(null);
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
    const popoverSize = isAskingRef.current
      ? INPUT_POPOVER_SIZE
      : ACTION_POPOVER_SIZE;
    const nextPosition = getPopoverPosition(rect, popoverSize, clip);

    const clippedHighlights = highlightRects
      .map((highlightRect) => clipRectToBounds(highlightRect, clip))
      .filter(
        (highlightRect): highlightRect is RectLike => highlightRect !== null
      );

    setIsInView(inView);
    if (nextPosition) {
      setPopoverPosition(nextPosition);
    }

    setSelection((prev) => {
      const nextText = text ?? prev?.text;
      if (!nextText) return prev;

      return {
        text: nextText,
        rect,
        highlightRects:
          clippedHighlights.length > 0 ? clippedHighlights : highlightRects,
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
      if (persistHighlightRef.current || isAskingRef.current) return;
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
    persistHighlightRef.current = false;
    setPersistHighlight(false);

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

      if (persistHighlightRef.current || isAskingRef.current) {
        const browserSelection = window.getSelection();
        if (
          !browserSelection ||
          browserSelection.isCollapsed ||
          browserSelection.rangeCount === 0
        ) {
          return;
        }
      }

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

  const handleAskStart = useCallback(() => {
    isAskingRef.current = true;
    persistHighlightRef.current = true;
    setPersistHighlight(true);
    refreshPersistedRects();
  }, [refreshPersistedRects]);

  const handleAskCancel = useCallback(() => {
    isAskingRef.current = false;
    refreshPersistedRects();
  }, [refreshPersistedRects]);

  const handleSubmit = useCallback(
    (question: string) => {
      if (!selection) return;

      const payload = {
        selectedText: selection.text,
        question,
      };

      if (onAskSubmit) {
        onAskSubmit(payload);
      } else {
        ask(buildSelectionAskMessage(payload.selectedText, payload.question));
      }

      dismissSelection();
    },
    [ask, dismissSelection, onAskSubmit, selection]
  );

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
            {persistHighlight &&
              activeSelection.highlightRects.map((rect, index) => (
                <div
                  key={`${rect.top}-${rect.left}-${rect.width}-${index}`}
                  aria-hidden
                  data-selection-highlight="true"
                  className="pointer-events-none fixed z-[110] bg-primary-sub-2 mix-blend-multiply"
                  style={{
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                  }}
                />
              ))}
            <SelectionPopover
              selectedText={activeSelection.text}
              position={popoverPosition}
              onAskStart={handleAskStart}
              onAskCancel={handleAskCancel}
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
