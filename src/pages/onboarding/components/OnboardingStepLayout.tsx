import type { ReactNode } from 'react';
import { QUESTION_TITLES } from '@pages/onboarding/constants/onboarding';
import type { QuestionStep } from '@pages/onboarding/types/onboarding';
import OnboardingNav from '@pages/onboarding/components/OnboardingNav';
import OnboardingProgress from '@pages/onboarding/components/OnboardingProgress';

type OnboardingStepLayoutProps = {
  currentStep: QuestionStep;
  children: ReactNode;
  nextLabel?: string;
  nextDisabled?: boolean;
  onPrev?: () => void;
  onNext: () => void;
  onSkip: () => void;
};

const OnboardingStepLayout = ({
  currentStep,
  children,
  nextLabel,
  nextDisabled,
  onPrev,
  onNext,
  onSkip,
}: OnboardingStepLayoutProps) => {
  const showPrev = currentStep > 1;

  return (
    <section className="flex min-h-[calc(100dvh-8.1rem)] w-full items-center justify-center bg-white p-[6rem]">
      <div className="flex w-full max-w-[80rem] flex-col items-center">
        <OnboardingProgress currentStep={currentStep} />
        <h1 className="mt-[10rem] text-center text-heading-3 text-black">
          {QUESTION_TITLES[currentStep]}
        </h1>

        <div className="mt-[6rem] flex w-full flex-col items-center">
          {children}
        </div>

        <OnboardingNav
          showPrev={showPrev}
          nextLabel={nextLabel}
          nextDisabled={nextDisabled}
          onPrev={onPrev}
          onNext={onNext}
          onSkip={onSkip}
        />
      </div>
    </section>
  );
};

export default OnboardingStepLayout;
