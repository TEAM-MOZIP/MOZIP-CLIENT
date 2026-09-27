import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingComplete from '@pages/onboarding/components/OnboardingComplete';
import OnboardingIntro from '@pages/onboarding/components/OnboardingIntro';
import OnboardingStepLayout from '@pages/onboarding/components/OnboardingStepLayout';
import BirthDateStep from '@pages/onboarding/components/step/BirthDateStep'; // Q1
import GenderStep from '@pages/onboarding/components/step/GenderStep'; // Q2
import ResidenceStep from '@pages/onboarding/components/step/ResidenceStep'; // Q3
import OccupationStep from '@pages/onboarding/components/step/OccupationStep'; // Q4
import HouseholdSizeStep from '@pages/onboarding/components/step/HouseholdSizeStep'; // Q5
import HouseholdSpecialStep from '@pages/onboarding/components/step/HouseholdSpecialStep'; // Q6
import IncomeStep from '@pages/onboarding/components/step/IncomeStep'; // Q7
import InterestStep from '@pages/onboarding/components/step/InterestStep'; // Q8
import { useGetMe } from '@pages/mypage/hooks/useGetMe';
import { useGetMyProfile } from '@pages/mypage/hooks/useGetMyProfile';
import { useOnboarding } from '@pages/onboarding/hooks/useOnboarding';
import { useOnboardingSubmit } from '@pages/onboarding/hooks/useOnboardingSubmit';
import { useRegions } from '@pages/onboarding/hooks/useRegions';
import { MAX_HOUSEHOLD_SIZE } from '@pages/onboarding/constants/household';
import { QUESTION_STEPS } from '@pages/onboarding/constants/onboarding';
import {
  ONBOARDING_STEP,
  type OnboardingAnswers,
} from '@pages/onboarding/types/onboarding';
import {
  getAnswerSummary,
  getStepAnswerLabel,
} from '@pages/onboarding/utils/getAnswerSummary';
import { getOnboardingErrorMessage } from '@pages/onboarding/utils/getOnboardingErrorMessage';
import { mapUserProfileToAnswers } from '@pages/onboarding/utils/mapUserProfileToAnswers';
import { saveOnboardingInterests } from '@pages/onboarding/utils/onboardingInterestsStorage';
import { toUserProfileUpdateRequest } from '@pages/onboarding/utils/toUserProfileUpdateRequest';

type OnboardingPageProps = {
  mode?: 'create' | 'edit';
};

type OnboardingFlowProps = {
  mode: 'create' | 'edit';
  initialAnswers?: OnboardingAnswers;
};

const OnboardingFlow = ({ mode, initialAnswers }: OnboardingFlowProps) => {
  const navigate = useNavigate();
  const isEdit = mode === 'edit';
  const { data: regions = [], isLoading: isRegionsLoading } = useRegions();
  const { mutateAsync, isPending, error } = useOnboardingSubmit();
  const { data: me } = useGetMe();
  // 처음 온보딩을 마치면 완료 화면을 보여준다(프로필 수정은 바로 마이페이지로 돌아간다).
  const [completedAnswers, setCompletedAnswers] =
    useState<OnboardingAnswers | null>(null);

  const handleComplete = useCallback(
    async (answers: OnboardingAnswers) => {
      try {
        await mutateAsync(toUserProfileUpdateRequest(answers));
        saveOnboardingInterests(answers.interests);
        if (isEdit) {
          navigate('/mypage', { replace: true });
          return;
        }
        setCompletedAnswers(answers);
      } catch {
        // 실패 메시지는 useOnboardingSubmit의 error 상태로 화면에 노출한다.
      }
    },
    [isEdit, mutateAsync, navigate]
  );

  const handleSkip = useCallback(() => {
    navigate(isEdit ? '/mypage' : '/', { replace: isEdit });
  }, [isEdit, navigate]);

  const {
    step,
    answers,
    canGoNext,
    maxVisitedStep,
    goToStep,
    start,
    skipAll,
    goNext,
    goPrev,
    setBirthDate,
    setGender,
    setRegionId,
    setOccupation,
    setHouseholdSize,
    toggleHouseholdSpecial,
    clearHouseholdSpecials,
    setIncomeBracket,
    toggleInterest,
  } = useOnboarding(handleComplete, {
    initialAnswers,
    initialStep: isEdit ? ONBOARDING_STEP.birthDate : ONBOARDING_STEP.intro,
    allowAllSteps: isEdit,
    onSkip: handleSkip,
  });

  const getStepAnswers = (source: OnboardingAnswers) =>
    Object.fromEntries(
      QUESTION_STEPS.map((questionStep) => [
        questionStep,
        getStepAnswerLabel(questionStep, source, regions),
      ])
    );

  if (completedAnswers) {
    return (
      <OnboardingComplete
        nickname={me?.nickname}
        summary={getAnswerSummary(completedAnswers, regions)}
        stepAnswers={getStepAnswers(completedAnswers)}
        onGoPolicies={() => navigate('/package')}
        onGoHome={() => navigate('/')}
      />
    );
  }

  if (step === ONBOARDING_STEP.intro) {
    return <OnboardingIntro onStart={start} onLater={skipAll} />;
  }

  const nextLabel =
    step === ONBOARDING_STEP.interest
      ? isPending
        ? '등록 중...'
        : '완료'
      : '다음';

  // Q7은 혼자 사는지에 따라 "내 소득"/"우리 집 소득"으로 묻는다.
  const householdSize = answers.householdSize ?? 1;
  const livesAlone = householdSize === 1;
  const incomeTitle = livesAlone
    ? '내 한 달 소득은 어느 정도인가요?'
    : '우리 집 한 달 소득은 어느 정도인가요?';
  const incomeDescription = livesAlone
    ? '세금 떼기 전 기준이에요. 용돈·아르바이트 소득도 포함해요.'
    : `세금 떼기 전, 함께 사는 ${
        householdSize >= MAX_HOUSEHOLD_SIZE
          ? `${MAX_HOUSEHOLD_SIZE}명 이상`
          : `${householdSize}명`
      }의 소득을 모두 합친 금액이에요.`;
  const isIncomeStep = step === ONBOARDING_STEP.income;

  return (
    <OnboardingStepLayout
      currentStep={step}
      title={isIncomeStep ? incomeTitle : undefined}
      description={isIncomeStep ? incomeDescription : undefined}
      stepAnswers={getStepAnswers(answers)}
      maxVisitedStep={maxVisitedStep}
      onStepClick={goToStep}
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

      {step === ONBOARDING_STEP.occupation && (
        <OccupationStep value={answers.occupation} onChange={setOccupation} />
      )}

      {step === ONBOARDING_STEP.householdSize && (
        <HouseholdSizeStep
          value={answers.householdSize}
          onChange={setHouseholdSize}
        />
      )}

      {step === ONBOARDING_STEP.householdSpecial && (
        <HouseholdSpecialStep
          value={answers.householdSpecials}
          onToggle={toggleHouseholdSpecial}
          onClear={clearHouseholdSpecials}
        />
      )}

      {isIncomeStep && (
        <IncomeStep
          householdSize={householdSize}
          value={answers.incomeBracket}
          showParentIncomeHint={answers.occupation === 'STUDENT' && !livesAlone}
          onChange={setIncomeBracket}
        />
      )}

      {step === ONBOARDING_STEP.interest && (
        <InterestStep
          selectedIds={answers.interests}
          onToggle={toggleInterest}
        />
      )}

      {step === ONBOARDING_STEP.interest && error && (
        <p className="mt-[1.6rem] text-body-3 text-point">
          {getOnboardingErrorMessage(error)}
        </p>
      )}
    </OnboardingStepLayout>
  );
};

const EditOnboardingPage = () => {
  const { data: myProfile, isLoading } = useGetMyProfile();

  if (isLoading) return null;

  return (
    <OnboardingFlow
      mode="edit"
      initialAnswers={mapUserProfileToAnswers(myProfile)}
    />
  );
};

const OnboardingPage = ({ mode = 'create' }: OnboardingPageProps) => {
  if (mode === 'edit') return <EditOnboardingPage />;
  return <OnboardingFlow mode="create" />;
};

export default OnboardingPage;
