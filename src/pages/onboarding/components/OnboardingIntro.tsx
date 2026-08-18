import onboardingHero from '@shared/assets/images/onboarding/onboarding-hero.png';

type OnboardingIntroProps = {
  onStart: () => void;
  onLater: () => void;
};

const OnboardingIntro = ({ onStart, onLater }: OnboardingIntroProps) => {
  return (
    <section className="flex min-h-[calc(100dvh-8.1rem)] w-full items-center justify-center bg-white p-[6rem]">
      <div className="flex w-full max-w-[40rem] flex-col items-center">
        <img
          src={onboardingHero}
          alt="MOZIP"
          className="h-auto w-full max-w-[38rem] max-h-[min(38rem,38dvh)] object-contain"
          draggable={false}
        />
        <p className="my-[6rem] text-center text-heading-3 font-medium text-gray-600">
          내 조건을 입력하면
          <br />
          받을 수 있는 혜택을 찾아드려요.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="h-[5.8rem] w-full max-w-[38rem] rounded-[0.8rem] bg-primary-sub-1 text-button-1 text-gray-800 transition-all hover:brightness-98"
        >
          시작하기
        </button>
        <button
          type="button"
          onClick={onLater}
          className="mt-[2.4rem] text-button-3 text-gray-400 transition-colors underline hover:text-gray-500"
        >
          나중에
        </button>
      </div>
    </section>
  );
};

export default OnboardingIntro;
