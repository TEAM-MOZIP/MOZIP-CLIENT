import { useEffect, useState } from 'react';
import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';

// 요약 생성은 몇 초에서 십여 초가 걸려서, 진행 중인 느낌을 주도록 안내 문구를 차례로 바꿔 보여준다.
// 마지막 문구에서 멈추고 반복하지 않는다(다시 처음으로 돌아가면 오히려 오래 걸리는 느낌을 준다).
const PROGRESS_MESSAGES = [
  '정책 원문을 꼼꼼히 읽고 있어요',
  '지원 대상과 혜택을 정리하고 있어요',
  '어려운 말을 쉬운 말로 바꾸고 있어요',
  '거의 다 됐어요, 조금만 기다려 주세요',
] as const;

const MESSAGE_INTERVAL_MS = 2500;
const DOT_DELAYS = ['0s', '0.15s', '0.3s'];

const AiSummaryLoading = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (messageIndex >= PROGRESS_MESSAGES.length - 1) return;

    const timer = setTimeout(
      () => setMessageIndex((index) => index + 1),
      MESSAGE_INTERVAL_MS
    );
    return () => clearTimeout(timer);
  }, [messageIndex]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-[1.2rem]"
    >
      <style>{`
        @keyframes mozip-ai-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-0.3rem); }
        }
        @keyframes mozip-ai-fade-in {
          from { opacity: 0; transform: translateY(0.4rem); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <span className="relative flex size-[3.6rem] shrink-0 items-center justify-center">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-primary/70 motion-safe:animate-ping"
        />
        <img
          src={mozipAiIcon}
          alt=""
          aria-hidden
          draggable={false}
          className="relative size-[3.6rem] motion-safe:animate-[mozip-ai-float_1.8s_ease-in-out_infinite]"
        />
      </span>

      <div className="min-w-0">
        <p className="flex items-center gap-[0.6rem] text-body-3 font-semibold text-title">
          MOZIP AI가 정책 정보를 요약하고 있어요
          <span aria-hidden className="flex items-end gap-[0.3rem]">
            {DOT_DELAYS.map((delay) => (
              <span
                key={delay}
                className="size-[0.4rem] rounded-full bg-gray-500 motion-safe:animate-bounce"
                style={{ animationDelay: delay }}
              />
            ))}
          </span>
        </p>
        <p
          key={messageIndex}
          className="mt-[0.2rem] text-caption text-gray-500 motion-safe:animate-[mozip-ai-fade-in_0.4s_ease-out]"
        >
          {PROGRESS_MESSAGES[messageIndex]}
        </p>
      </div>
    </div>
  );
};

export default AiSummaryLoading;
