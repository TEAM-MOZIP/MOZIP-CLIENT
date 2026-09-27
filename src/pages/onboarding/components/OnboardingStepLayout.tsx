import type { ReactNode } from 'react';
import {
  QUESTION_DESCRIPTIONS,
  QUESTION_TITLES,
  TOTAL_QUESTION_STEPS,
} from '@pages/onboarding/constants/onboarding';
import type { QuestionStep } from '@pages/onboarding/types/onboarding';
import OnboardingNav from '@pages/onboarding/components/OnboardingNav';
import OnboardingSidebarLayout from '@pages/onboarding/components/OnboardingSidebarLayout';

type OnboardingStepLayoutProps = {
  currentStep: QuestionStep;
  children: ReactNode;
  /** 질문 제목을 답변에 따라 바꿀 때(기본값은 QUESTION_TITLES) */
  title?: string;
  /** 제목 아래 안내 문구(기본값은 QUESTION_DESCRIPTIONS) */
  description?: ReactNode;
  stepAnswers?: Partial<Record<QuestionStep, string | null>>;
  maxVisitedStep?: number;
  onStepClick?: (step: QuestionStep) => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  onPrev?: () => void;
  onNext: () => void;
  onSkip: () => void;
};

const OnboardingStepLayout = ({
  currentStep,
  children,
  title,
  description,
  stepAnswers,
  maxVisitedStep,
  onStepClick,
  nextLabel,
  nextDisabled,
  onPrev,
  onNext,
  onSkip,
}: OnboardingStepLayoutProps) => {
  return (
    <OnboardingSidebarLayout
      currentStep={currentStep}
      stepAnswers={stepAnswers}
      maxVisitedStep={maxVisitedStep}
      onStepClick={onStepClick}
    >
      <p className="text-caption font-semibold text-gray-500">
        STEP {currentStep} / {TOTAL_QUESTION_STEPS}
      </p>
      <h1 className="mt-[0.6rem] text-[2.6rem] leading-[1.4] font-bold tracking-[-0.04em] text-gray-800">
        {title ?? QUESTION_TITLES[currentStep]}
      </h1>
      <p className="mt-[0.6rem] text-body-3 text-gray-500">
        {description ?? QUESTION_DESCRIPTIONS[currentStep]}
      </p>

      <div className="mt-[2.8rem] max-w-[72rem] rounded-[2rem] bg-white p-[2rem] shadow-[0_0.2rem_1.6rem_rgba(0,0,0,0.06)] lg:p-[2.8rem]">
        {children}
      </div>

      <OnboardingNav
        showPrev={currentStep > 1}
        nextLabel={nextLabel}
        nextDisabled={nextDisabled}
        onPrev={onPrev}
        onNext={onNext}
        onSkip={onSkip}
      />
    </OnboardingSidebarLayout>
  );
};

export default OnboardingStepLayout;
