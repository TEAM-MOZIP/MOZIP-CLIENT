import { TOTAL_QUESTION_STEPS } from '@pages/onboarding/constants/onboarding';
import type { QuestionStep } from '@pages/onboarding/types/onboarding';

type OnboardingProgressProps = {
  currentStep: QuestionStep;
};

const OnboardingProgress = ({ currentStep }: OnboardingProgressProps) => {
  return (
    <div className="flex w-full max-w-[56rem] gap-[1.6rem]" role="progressbar">
      {Array.from({ length: TOTAL_QUESTION_STEPS }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;

        return (
          <div
            key={stepNumber}
            className={[
              'h-[0.8rem] flex-1 rounded-full',
              isActive ? 'bg-primary-sub-1' : 'bg-gray-200',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
};

export default OnboardingProgress;
