import { useCallback, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ELDERLY_AGE } from '@pages/onboarding/constants/household';
import { LAST_QUESTION_STEP } from '@pages/onboarding/constants/onboarding';
import {
  ONBOARDING_STEP,
  type Gender,
  type HouseholdSpecial,
  type IncomeBracket,
  type Occupation,
  type OnboardingAnswers,
  type OnboardingStep,
  type QuestionStep,
} from '@pages/onboarding/types/onboarding';
import { getAgeFromBirthDate } from '@pages/package/utils/getAgeGroup';

const INITIAL_ANSWERS: OnboardingAnswers = {
  birthDate: null,
  gender: null,
  regionId: null,
  occupation: null,
  householdSize: null,
  householdSpecials: [],
  incomeBracket: null,
  interests: [],
};

const toggleItem = <T>(items: T[], id: T) =>
  items.includes(id) ? items.filter((item) => item !== id) : [...items, id];

type UseOnboardingOptions = {
  initialAnswers?: OnboardingAnswers;
  initialStep?: OnboardingStep;
  /** 프로필 수정처럼 모든 답이 이미 있으면 사이드바에서 어느 단계로든 이동할 수 있게 한다 */
  allowAllSteps?: boolean;
  onSkip?: () => void;
};

export const useOnboarding = (
  onComplete: (answers: OnboardingAnswers) => void,
  {
    initialAnswers = INITIAL_ANSWERS,
    initialStep = ONBOARDING_STEP.intro,
    allowAllSteps = false,
    onSkip,
  }: UseOnboardingOptions = {}
) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>(initialStep);
  const [answers, setAnswers] = useState<OnboardingAnswers>(initialAnswers);
  // 사이드바에서 한 번 지나온 단계까지만 되돌아갈 수 있다.
  const [maxVisitedStep, setMaxVisitedStep] = useState<number>(
    allowAllSteps ? LAST_QUESTION_STEP : initialStep
  );
  // Q6을 처음 열 때만 만 65세 이상에게 어르신 항목을 미리 골라 둔다(사용자가 해제하면 그대로 둔다).
  const hasVisitedSpecialStep = useRef(false);

  const canGoNext = useMemo(() => {
    switch (step) {
      case ONBOARDING_STEP.birthDate:
        return answers.birthDate !== null;
      case ONBOARDING_STEP.gender:
        return answers.gender !== null;
      case ONBOARDING_STEP.residence:
        return answers.regionId !== null;
      case ONBOARDING_STEP.occupation:
        return answers.occupation !== null;
      case ONBOARDING_STEP.householdSize:
        return answers.householdSize !== null;
      case ONBOARDING_STEP.householdSpecial:
        return true; // 빈 선택 = 해당 없음
      case ONBOARDING_STEP.income:
        return answers.incomeBracket !== null;
      case ONBOARDING_STEP.interest:
        return answers.interests.length > 0;
      default:
        return false;
    }
  }, [answers, step]);

  const goNext = useCallback(() => {
    if (step >= LAST_QUESTION_STEP) {
      onComplete(answers);
      return;
    }

    if (
      step === ONBOARDING_STEP.householdSize &&
      !hasVisitedSpecialStep.current
    ) {
      hasVisitedSpecialStep.current = true;
      const age = answers.birthDate
        ? getAgeFromBirthDate(answers.birthDate)
        : null;
      if (
        age !== null &&
        age >= ELDERLY_AGE &&
        answers.householdSpecials.length === 0
      ) {
        setAnswers((prev) => ({ ...prev, householdSpecials: ['ELDERLY'] }));
      }
    }

    setStep((prev) => (prev + 1) as OnboardingStep);
    setMaxVisitedStep((prev) => Math.max(prev, step + 1));
  }, [answers, onComplete, step]);

  const goToStep = useCallback(
    (target: QuestionStep) => {
      if (target > maxVisitedStep) return;
      setStep(target);
    },
    [maxVisitedStep]
  );

  const goPrev = useCallback(() => {
    if (step <= ONBOARDING_STEP.birthDate) return;
    setStep((prev) => (prev - 1) as OnboardingStep);
  }, [step]);

  const start = useCallback(() => {
    setStep(ONBOARDING_STEP.birthDate);
    setMaxVisitedStep((prev) => Math.max(prev, ONBOARDING_STEP.birthDate));
  }, []);

  const skipAll = useCallback(() => {
    if (onSkip) {
      onSkip();
      return;
    }
    navigate('/');
  }, [navigate, onSkip]);

  const setBirthDate = useCallback((birthDate: string) => {
    setAnswers((prev) => ({ ...prev, birthDate }));
  }, []);

  const setGender = useCallback((gender: Gender) => {
    setAnswers((prev) => ({
      ...prev,
      gender: prev.gender === gender ? null : gender,
    }));
  }, []);

  const setRegionId = useCallback((regionId: number) => {
    setAnswers((prev) => ({
      ...prev,
      regionId: prev.regionId === regionId ? null : regionId,
    }));
  }, []);

  const setOccupation = useCallback((occupation: Occupation) => {
    setAnswers((prev) => ({
      ...prev,
      occupation: prev.occupation === occupation ? null : occupation,
    }));
  }, []);

  // 소득 구간은 중위소득 비율이라 가구원 수가 바뀌어도 그대로 둔다(금액 표시만 다시 계산된다).
  const setHouseholdSize = useCallback((householdSize: number) => {
    setAnswers((prev) => ({
      ...prev,
      householdSize:
        prev.householdSize === householdSize ? null : householdSize,
    }));
  }, []);

  const toggleHouseholdSpecial = useCallback((special: HouseholdSpecial) => {
    setAnswers((prev) => ({
      ...prev,
      householdSpecials: toggleItem(prev.householdSpecials, special),
    }));
  }, []);

  const clearHouseholdSpecials = useCallback(() => {
    setAnswers((prev) => ({ ...prev, householdSpecials: [] }));
  }, []);

  const setIncomeBracket = useCallback((incomeBracket: IncomeBracket) => {
    setAnswers((prev) => ({
      ...prev,
      incomeBracket:
        prev.incomeBracket === incomeBracket ? null : incomeBracket,
    }));
  }, []);

  const toggleInterest = useCallback((id: string) => {
    setAnswers((prev) => ({
      ...prev,
      interests: toggleItem(prev.interests, id),
    }));
  }, []);

  return {
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
  };
};
