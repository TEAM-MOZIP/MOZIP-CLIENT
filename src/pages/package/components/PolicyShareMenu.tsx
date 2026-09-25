import { useEffect, useRef, useState } from 'react';
import kakaoIcon from '@shared/assets/icons/kakao-icon.svg';
import { copyText } from '@shared/utils/copyText';
import { isKakaoShareAvailable, shareToKakao } from '@shared/utils/kakaoShare';

type PolicyShareMenuProps = {
  /** 누르는 시점의 최신 데이터(가이드·AI 요약이 늦게 와도 반영)로 만든다 */
  getCopyText: () => string;
  getKakaoShare: () => { text: string; url: string };
  className?: string;
};

type Feedback = { tone: 'success' | 'error'; message: string } | null;

const FEEDBACK_DURATION_MS = 1800;

const MENU_ITEM_CLASS =
  'flex w-full cursor-pointer items-center gap-[1rem] rounded-[0.8rem] px-[1.2rem] py-[1rem] text-left text-body-3 text-title transition-colors hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-transparent';

/** 정책 상세의 "공유" 버튼 + 위로 열리는 메뉴(텍스트 복사 / 카카오톡 공유). */
const PolicyShareMenu = ({
  getCopyText,
  getKakaoShare,
  className = '',
}: PolicyShareMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const feedbackTimerRef = useRef<number | null>(null);
  const canShareKakao = isKakaoShareAvailable();

  const close = (restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  const showFeedback = (next: NonNullable<Feedback>) => {
    setFeedback(next);
    if (feedbackTimerRef.current) window.clearTimeout(feedbackTimerRef.current);
    feedbackTimerRef.current = window.setTimeout(
      () => setFeedback(null),
      FEEDBACK_DURATION_MS
    );
  };

  useEffect(
    () => () => {
      if (feedbackTimerRef.current)
        window.clearTimeout(feedbackTimerRef.current);
    },
    []
  );

  useEffect(() => {
    if (!isOpen) return;
    firstItemRef.current?.focus();

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) close();
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const handleCopy = async () => {
    const copied = await copyText(getCopyText());
    close(true);
    showFeedback(
      copied
        ? { tone: 'success', message: '정책 내용을 복사했어요.' }
        : { tone: 'error', message: '복사하지 못했어요. 다시 시도해 주세요.' }
    );
  };

  const handleKakao = async () => {
    close(true);
    try {
      await shareToKakao({ ...getKakaoShare(), buttonTitle: '정책 보러가기' });
    } catch {
      showFeedback({
        tone: 'error',
        message: '카카오톡 공유를 열지 못했어요.',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      // 메뉴가 열려 있을 때 Esc는 메뉴만 닫는다(모달까지 닫히지 않게 여기서 멈춘다).
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !isOpen) return;
        event.stopPropagation();
        close(true);
      }}
    >
      {isOpen && (
        <div
          role="menu"
          aria-label="공유 방법"
          className="absolute bottom-full left-1/2 z-10 mb-[0.8rem] w-[max(100%,22rem)] -translate-x-1/2 rounded-[1.2rem] border border-gray-200 bg-white p-[0.6rem] shadow-[0_0.4rem_1.6rem_rgba(0,0,0,0.12)]"
        >
          <button
            ref={firstItemRef}
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className={MENU_ITEM_CLASS}
          >
            <span
              aria-hidden
              className="flex size-[2.4rem] shrink-0 items-center justify-center rounded-full bg-gray-100 text-[1.3rem] font-bold text-gray-600"
            >
              T
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">텍스트로 복사</span>
              <span className="block text-caption text-gray-500">
                정리된 전체 내용을 복사해요
              </span>
            </span>
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={!canShareKakao}
            onClick={handleKakao}
            className={MENU_ITEM_CLASS}
          >
            <span
              aria-hidden
              className="flex size-[2.4rem] shrink-0 items-center justify-center rounded-full bg-[#FEE500]"
            >
              <img src={kakaoIcon} alt="" className="size-[1.4rem]" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold">카카오톡으로 공유</span>
              <span className="block text-caption text-gray-500">
                {canShareKakao
                  ? '친구나 가족에게 바로 보내요'
                  : '지금은 사용할 수 없어요'}
              </span>
            </span>
          </button>
        </div>
      )}

      {feedback && (
        <p
          role="status"
          className={`pointer-events-none absolute bottom-full left-1/2 mb-[0.8rem] -translate-x-1/2 whitespace-nowrap rounded-full px-[1.4rem] py-[0.6rem] text-caption font-medium text-white ${
            feedback.tone === 'success' ? 'bg-gray-700' : 'bg-point'
          }`}
        >
          {feedback.message}
        </p>
      )}

      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => {
          setFeedback(null);
          setIsOpen((prev) => !prev);
        }}
        className="flex h-[4.4rem] w-full cursor-pointer items-center justify-center rounded-[0.8rem] border border-gray-300 bg-white text-button-2 text-title transition-colors duration-200 hover:bg-gray-100"
      >
        공유
      </button>
    </div>
  );
};

export default PolicyShareMenu;
