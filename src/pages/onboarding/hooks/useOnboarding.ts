import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LAST_QUESTION_STEP } from '@pages/onboarding/constants/onboarding';
import {
  ONBOARDING_STEP,
  type EmploymentStatus,
  type Gender,
  type HouseholdType,
  type IncomeType,
  type OnboardingAnswers,
  type OnboardingStep,
} from '@pages/onboarding/types/onboarding';

const INITIAL_ANSWERS: OnboardingAnswers = {
  birthDate: null,
  gender: null,
  regionId: null,
  employmentStatus: null,
  householdType: null,
  incomeType: null,
  incomeValue: null,
  interests: [],
};

const toggleItem = (items: string[], id: string) =>
  items.includes(id) ? items.filter((item) => item !== id) : [...items, id];

type UseOnboardingOptions = {
  initialAnswers?: OnboardingAnswers;
  initialStep?: OnboardingStep;
  onSkip?: () => void;
};

export const useOnboarding = (
  onComplete: (answers: OnboardingAnswers) => void,
  {
    initialAnswers = INITIAL_ANSWERS,
    initialStep = ONBOARDING_STEP.intro,
    onSkip,
  }: UseOnboardingOptions = {}
) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>(initialStep);
  const [answers, setAnswers] = useState<OnboardingAnswers>(initialAnswers);

  const canGoNext = useMemo(() => {
    switch (step) {
      case ONBOARDING_STEP.birthDate:
        return answers.birthDate !== null;
      case ONBOARDING_STEP.gender:
        return answers.gender !== null;
      case ONBOARDING_STEP.residence:
        return answers.regionId !== null;
      case ONBOARDING_STEP.employmentStatus:
        return answers.employmentStatus !== null;
      case ONBOARDING_STEP.householdType:
        return answers.householdType !== null;
      case ONBOARDING_STEP.income:
        return answers.incomeType !== null && answers.incomeValue !== null;
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

    setStep((prev) => (prev + 1) as OnboardingStep);
  }, [answers, onComplete, step]);

  const goPrev = useCallback(() => {
    if (step <= ONBOARDING_STEP.birthDate) return;
    setStep((prev) => (prev - 1) as OnboardingStep);
  }, [step]);

  const start = useCallback(() => {
    setStep(ONBOARDING_STEP.birthDate);
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

  const setEmploymentStatus = useCallback(
    (employmentStatus: EmploymentStatus) => {
      setAnswers((prev) => ({
        ...prev,
        employmentStatus:
          prev.employmentStatus === employmentStatus ? null : employmentStatus,
      }));
    },
    []
  );

  const setHouseholdType = useCallback((householdType: HouseholdType) => {
    setAnswers((prev) => ({
      ...prev,
      householdType:
        prev.householdType === householdType ? null : householdType,
    }));
  }, []);

  const setIncomeType = useCallback((incomeType: IncomeType) => {
    setAnswers((prev) => ({
      ...prev,
      incomeType: prev.incomeType === incomeType ? null : incomeType,
      incomeValue: null,
    }));
  }, []);

  const setIncomeValue = useCallback((incomeValue: number | null) => {
    setAnswers((prev) => ({ ...prev, incomeValue }));
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
  };
};
