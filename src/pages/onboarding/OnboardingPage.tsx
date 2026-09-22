import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingIntro from '@pages/onboarding/components/OnboardingIntro';
import OnboardingStepLayout from '@pages/onboarding/components/OnboardingStepLayout';
import BirthDateStep from '@pages/onboarding/components/step/BirthDateStep'; // Q1
import GenderStep from '@pages/onboarding/components/step/GenderStep'; // Q2
import ResidenceStep from '@pages/onboarding/components/step/ResidenceStep'; // Q3
import EmploymentStatusStep from '@pages/onboarding/components/step/EmploymentStatusStep'; // Q4
import HouseholdTypeStep from '@pages/onboarding/components/step/HouseholdTypeStep'; // Q5
import IncomeStep from '@pages/onboarding/components/step/IncomeStep'; // Q6
import InterestStep from '@pages/onboarding/components/step/InterestStep'; // Q7
import { useOnboarding } from '@pages/onboarding/hooks/useOnboarding';
import { useOnboardingSubmit } from '@pages/onboarding/hooks/useOnboardingSubmit';
import { useRegions } from '@pages/onboarding/hooks/useRegions';
import {
  ONBOARDING_STEP,
  type OnboardingAnswers,
} from '@pages/onboarding/types/onboarding';
import { getOnboardingErrorMessage } from '@pages/onboarding/utils/getOnboardingErrorMessage';
import { saveOnboardingInterests } from '@pages/onboarding/utils/onboardingInterestsStorage';
import { toUserProfileUpdateRequest } from '@pages/onboarding/utils/toUserProfileUpdateRequest';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { data: regions = [], isLoading: isRegionsLoading } = useRegions();
  const { mutateAsync, isPending, error } = useOnboardingSubmit();

  const handleComplete = useCallback(
    async (answers: OnboardingAnswers) => {
      try {
        await mutateAsync(toUserProfileUpdateRequest(answers));
        saveOnboardingInterests(answers.interests);
        navigate('/');
      } catch {
        // 실패 메시지는 useOnboardingSubmit의 error 상태로 화면에 노출한다.
      }
    },
    [mutateAsync, navigate]
  );

  const {
    step,
    answers,
    canGoNext,
    start,
    skipAll,
    goNext,
    goPrev,
    setBirthDate,
    setGender,
    setRegionId,
    setEmploymentStatus,
    setHouseholdType,
    setIncomeType,
    setIncomeValue,
    toggleInterest,
  } = useOnboarding(handleComplete);

  if (step === ONBOARDING_STEP.intro) {
    return <OnboardingIntro onStart={start} onLater={skipAll} />;
  }

  const nextLabel =
    step === ONBOARDING_STEP.interest
      ? isPending
        ? '등록 중...'
        : '완료'
      : '다음';

  return (
    <OnboardingStepLayout
      currentStep={step}
      nextLabel={nextLabel}
      nextDisabled={!canGoNext || isPending}
      onPrev={goPrev}
      onNext={goNext}
      onSkip={skipAll}
    >
      {step === ONBOARDING_STEP.birthDate && (
        <BirthDateStep value={answers.birthDate} onChange={setBirthDate} />
      )}

      {step === ONBOARDING_STEP.gender && (
        <GenderStep value={answers.gender} onChange={setGender} />
      )}

      {step === ONBOARDING_STEP.residence && (
        <ResidenceStep
          regions={regions}
          isLoading={isRegionsLoading}
          value={answers.regionId}
          onChange={setRegionId}
        />
      )}

      {step === ONBOARDING_STEP.employmentStatus && (
        <EmploymentStatusStep
          value={answers.employmentStatus}
          onChange={setEmploymentStatus}
        />
      )}

      {step === ONBOARDING_STEP.householdType && (
        <HouseholdTypeStep
          value={answers.householdType}
          onChange={setHouseholdType}
        />
      )}

      {step === ONBOARDING_STEP.income && (
        <IncomeStep
          incomeType={answers.incomeType}
          incomeValue={answers.incomeValue}
          onChangeType={setIncomeType}
          onChangeValue={setIncomeValue}
        />
      )}

      {step === ONBOARDING_STEP.interest && (
        <InterestStep
          selectedIds={answers.interests}
          onToggle={toggleInterest}
        />
      )}

      {step === ONBOARDING_STEP.interest && error && (
        <p className="mt-[2.4rem] text-body-3 text-point">
          {getOnboardingErrorMessage(error)}
        </p>
      )}
    </OnboardingStepLayout>
  );
};

export default OnboardingPage;
