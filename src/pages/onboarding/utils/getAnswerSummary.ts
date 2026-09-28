import { GENDER_OPTIONS } from '@pages/onboarding/constants/genders';
import {
  HOUSEHOLD_SIZE_OPTIONS,
  HOUSEHOLD_SPECIAL_OPTIONS,
  NO_HOUSEHOLD_SPECIAL_LABEL,
} from '@pages/onboarding/constants/household';
import {
  getIncomeBracketOptions,
  UNKNOWN_INCOME_LABEL,
} from '@pages/onboarding/constants/medianIncome';
import { OCCUPATION_OPTIONS } from '@pages/onboarding/constants/occupations';
import { INTEREST_OPTIONS } from '@pages/onboarding/constants/interests';
import {
  ONBOARDING_STEP,
  type OnboardingAnswers,
  type QuestionStep,
  type RegionResponse,
} from '@pages/onboarding/types/onboarding';
import { getAgeFromBirthDate } from '@pages/package/utils/getAgeGroup';

const SPECIAL_SHORT_LABELS: Record<string, string> = {
  SINGLE_PARENT: '한부모',
  DISABLED: '장애인 가족',
  ELDERLY: '어르신 가구',
};

/** 한 단계의 답을 사이드바에 보여줄 짧은 문구로 만든다. 답이 없으면 null. */
export const getStepAnswerLabel = (
  step: QuestionStep,
  answers: OnboardingAnswers,
  regions: RegionResponse[]
): string | null => {
  switch (step) {
    case ONBOARDING_STEP.birthDate:
      return answers.birthDate ? answers.birthDate.replaceAll('-', '.') : null;
    case ONBOARDING_STEP.gender:
      return (
        GENDER_OPTIONS.find((option) => option.id === answers.gender)?.label ??
        null
      );
    case ONBOARDING_STEP.residence:
      return (
        regions.find((region) => region.id === answers.regionId)?.name ?? null
      );
    case ONBOARDING_STEP.occupation:
      return (
        OCCUPATION_OPTIONS.find((option) => option.id === answers.occupation)
          ?.label ?? null
      );
    case ONBOARDING_STEP.householdSize:
      return (
        HOUSEHOLD_SIZE_OPTIONS.find(
          (option) => option.value === answers.householdSize
        )?.label ?? null
      );
    case ONBOARDING_STEP.householdSpecial: {
      const labels = HOUSEHOLD_SPECIAL_OPTIONS.filter((option) =>
        answers.householdSpecials.includes(option.id)
      ).map((option) => SPECIAL_SHORT_LABELS[option.id]);
      return labels.length > 0 ? labels.join(', ') : NO_HOUSEHOLD_SPECIAL_LABEL;
    }
    case ONBOARDING_STEP.income:
      if (answers.incomeBracket === null) return null;
      if (answers.incomeBracket === 'UNKNOWN') return UNKNOWN_INCOME_LABEL;
      return (
        getIncomeBracketOptions(answers.householdSize ?? 1).find(
          (option) => option.value === answers.incomeBracket
        )?.label ?? null
      );
    case ONBOARDING_STEP.interest: {
      const labels = INTEREST_OPTIONS.filter((option) =>
        answers.interests.includes(option.id)
      ).map((option) => option.label);
      return labels.length > 0 ? labels.join(', ') : null;
    }
    default:
      return null;
  }
};

export type SummaryTone = 'lavender' | 'blue' | 'yellow' | 'green';

/** 완료 화면의 조건 칩(나이·지역·하는 일·가구·관심 분야). */
export const getAnswerSummary = (
  answers: OnboardingAnswers,
  regions: RegionResponse[]
): { label: string; tone: SummaryTone }[] => {
  const items: { label: string; tone: SummaryTone }[] = [];

  const age = answers.birthDate ? getAgeFromBirthDate(answers.birthDate) : null;
  if (age !== null) items.push({ label: `만 ${age}세`, tone: 'lavender' });

  const region = getStepAnswerLabel(
    ONBOARDING_STEP.residence,
    answers,
    regions
  );
  if (region) items.push({ label: region, tone: 'blue' });

  const occupation = getStepAnswerLabel(
    ONBOARDING_STEP.occupation,
    answers,
    regions
  );
  if (occupation) items.push({ label: occupation, tone: 'yellow' });

  if (answers.householdSize !== null) {
    items.push({
      label:
        answers.householdSize === 1
          ? '1인 가구'
          : `${getStepAnswerLabel(ONBOARDING_STEP.householdSize, answers, regions)} 가구`,
      tone: 'yellow',
    });
  }

  INTEREST_OPTIONS.filter((option) =>
    answers.interests.includes(option.id)
  ).forEach((option) => items.push({ label: option.label, tone: 'green' }));

  return items;
};
