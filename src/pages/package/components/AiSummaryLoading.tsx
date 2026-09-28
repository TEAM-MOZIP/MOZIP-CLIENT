import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';

// 요약 생성은 몇 초에서 십여 초가 걸려서, MOZIP AI 아이콘이 떠 있고 뒤로 퍼지는 효과로 진행 중임을 보여준다.
const AiSummaryLoading = () => (
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

    <p className="text-body-3 font-semibold text-title">
      MOZIP AI가 정책 정보를 요약하고 있어요
    </p>
  </div>
);

export default AiSummaryLoading;
