type OnboardingNavProps = {
  showPrev?: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
  onPrev?: () => void;
  onNext: () => void;
  onSkip: () => void;
};

const OnboardingNav = ({
  showPrev = false,
  nextLabel = '다음',
  nextDisabled = false,
  onPrev,
  onNext,
  onSkip,
}: OnboardingNavProps) => {
  return (
    <div className="mt-[12rem] flex w-full max-w-[48rem] flex-col items-center">
      <div className="flex w-full gap-[2rem]">
        {showPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="h-[5.8rem] flex-1 rounded-[0.8rem] text-button-1 bg-gray-200 text-gray-800 transition-all hover:brightness-98"
          >
            이전
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled}
          className="h-[5.8rem] flex-1 rounded-[0.8rem] text-button-1 bg-primary-sub-1 text-gray-800 transition-all hover:brightness-98 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-800 disabled:hover:brightness-100"
        >
          {nextLabel}
        </button>
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="mt-[2.4rem] text-button-3 text-gray-400 transition-colors underline hover:text-gray-500"
      >
        건너뛰기
      </button>
    </div>
  );
};

export default OnboardingNav;
