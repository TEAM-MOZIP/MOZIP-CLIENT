type OnboardingNavProps = {
  showPrev?: boolean;
  nextLabel?: string;
  nextDisabled?: boolean;
  onPrev?: () => void;
  onNext: () => void;
  onSkip: () => void;
  skipLabel?: string;
};

const OnboardingNav = ({
  showPrev = false,
  nextLabel = '다음',
  nextDisabled = false,
  onPrev,
  onNext,
  onSkip,
  skipLabel = '나중에 할게요',
}: OnboardingNavProps) => {
  return (
    <div className="mt-[2.4rem] flex max-w-[72rem] items-center gap-[1rem]">
      {showPrev && (
        <button
          type="button"
          onClick={onPrev}
          className="h-[5.2rem] cursor-pointer rounded-[1.2rem] bg-gray-100 px-[2.2rem] text-button-2 text-gray-700 transition-colors hover:bg-gray-200"
        >
          이전
        </button>
      )}
      <span className="flex-1" />
      <button
        type="button"
        onClick={onSkip}
        className="cursor-pointer px-[0.6rem] text-caption text-gray-500 underline underline-offset-[0.3rem] transition-colors hover:text-gray-700"
      >
        {skipLabel}
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={nextDisabled}
        className="h-[5.2rem] min-w-[10rem] cursor-pointer rounded-[1.2rem] bg-gray-800 px-[2.2rem] text-button-2 text-white transition-colors hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default OnboardingNav;
