import OnboardingIntro from '@pages/onboarding/components/OnboardingIntro';
import OnboardingStepLayout from '@pages/onboarding/components/OnboardingStepLayout';
import AgeStep from '@pages/onboarding/components/step/AgeStep'; // Q1
import GenderStep from '@pages/onboarding/components/step/GenderStep'; // Q2
import ResidenceStep from '@pages/onboarding/components/step/ResidenceStep'; // Q3
import SituationStep from '@pages/onboarding/components/step/SituationStep'; // Q4
import InterestStep from '@pages/onboarding/components/step/InterestStep'; // Q5
import { useOnboarding } from '@pages/onboarding/hooks/useOnboarding';
import { ONBOARDING_STEP } from '@pages/onboarding/types/onboarding';

const OnboardingPage = () => {
  const {
    step,
    answers,
    ageGroup,
    canGoNext,
    start,
    skipAll,
    goNext,
    goPrev,
    skip,
    setAge,
    setGender,
    setDistrict,
    toggleSituation,
    toggleInterest,
  } = useOnboarding();

  if (step === ONBOARDING_STEP.intro) {
    return <OnboardingIntro onStart={start} onLater={skipAll} />;
  }

  const nextLabel = step === ONBOARDING_STEP.interest ? '완료' : '다음';

  return (
    <OnboardingStepLayout
      currentStep={step}
      nextLabel={nextLabel}
      nextDisabled={!canGoNext}
      onPrev={goPrev}
      onNext={goNext}
      onSkip={skip}
    >
      {step === ONBOARDING_STEP.age && (
        <AgeStep age={answers.age} onChange={setAge} />
      )}

      {step === ONBOARDING_STEP.gender && (
        <GenderStep value={answers.gender} onChange={setGender} />
      )}

      {step === ONBOARDING_STEP.residence && (
        <ResidenceStep value={answers.district} onChange={setDistrict} />
      )}

      {step === ONBOARDING_STEP.situation && (
        <SituationStep
          ageGroup={ageGroup}
          selectedIds={answers.situations}
          onToggle={toggleSituation}
        />
      )}

      {step === ONBOARDING_STEP.interest && (
        <InterestStep
          selectedIds={answers.interests}
          onToggle={toggleInterest}
        />
      )}
    </OnboardingStepLayout>
  );
};

export default OnboardingPage;
