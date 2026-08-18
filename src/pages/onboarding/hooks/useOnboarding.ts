import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DEFAULT_AGE,
  LAST_QUESTION_STEP,
  MAX_AGE,
  MIN_AGE,
} from '@pages/onboarding/constants/onboarding';
import { getSituationIds } from '@pages/onboarding/constants/situations';
import {
  ONBOARDING_STEP,
  type Gender,
  type OnboardingAnswers,
  type OnboardingStep,
} from '@pages/onboarding/types/onboarding';
import { getAgeGroup } from '@pages/onboarding/utils/getAgeGroup';

const INITIAL_ANSWERS: OnboardingAnswers = {
  age: DEFAULT_AGE,
  gender: null,
  district: null,
  situations: [],
  interests: [],
};

const clampAge = (age: number) => Math.min(MAX_AGE, Math.max(MIN_AGE, age));

const toggleItem = (items: string[], id: string) =>
  items.includes(id) ? items.filter((item) => item !== id) : [...items, id];

export const useOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<OnboardingStep>(ONBOARDING_STEP.intro);
  const [answers, setAnswers] = useState<OnboardingAnswers>(INITIAL_ANSWERS);

  const ageGroup = useMemo(() => getAgeGroup(answers.age), [answers.age]);

  const canGoNext = useMemo(() => {
    switch (step) {
      case ONBOARDING_STEP.age:
        return true;
      case ONBOARDING_STEP.gender:
        return answers.gender !== null;
      case ONBOARDING_STEP.residence:
        return answers.district !== null;
      case ONBOARDING_STEP.situation:
        return answers.situations.length > 0;
      case ONBOARDING_STEP.interest:
        return answers.interests.length > 0;
      default:
        return false;
    }
  }, [answers, step]);

  const complete = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const goNext = useCallback(() => {
    if (step >= LAST_QUESTION_STEP) {
      complete();
      return;
    }

    setStep((prev) => (prev + 1) as OnboardingStep);
  }, [complete, step]);

  const goPrev = useCallback(() => {
    if (step <= ONBOARDING_STEP.age) return;
    setStep((prev) => (prev - 1) as OnboardingStep);
  }, [step]);

  const start = useCallback(() => {
    setStep(ONBOARDING_STEP.age);
  }, []);

  const skipAll = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const setAge = useCallback((age: number) => {
    const nextAge = clampAge(age);

    setAnswers((prev) => {
      const nextGroup = getAgeGroup(nextAge);
      const validIds = new Set(getSituationIds(nextGroup));

      return {
        ...prev,
        age: nextAge,
        situations: prev.situations.filter((id) => validIds.has(id)),
      };
    });
  }, []);

  const setGender = useCallback((gender: Gender) => {
    setAnswers((prev) => ({
      ...prev,
      gender: prev.gender === gender ? null : gender,
    }));
  }, []);

  const setDistrict = useCallback((district: string) => {
    setAnswers((prev) => ({
      ...prev,
      district: prev.district === district ? null : district,
    }));
  }, []);

  const toggleSituation = useCallback((id: string) => {
    setAnswers((prev) => ({
      ...prev,
      situations: toggleItem(prev.situations, id),
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
    ageGroup,
    canGoNext,
    start,
    skipAll,
    goNext,
    goPrev,
    skip: goNext,
    setAge,
    setGender,
    setDistrict,
    toggleSituation,
    toggleInterest,
  };
};
