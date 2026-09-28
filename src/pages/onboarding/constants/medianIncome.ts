import { MAX_HOUSEHOLD_SIZE } from '@pages/onboarding/constants/household';
import type { IncomeBracket } from '@pages/onboarding/types/onboarding';

/**
 * 2026년 기준 중위소득(월, 원). 보건복지부가 매년 고시하므로 해마다 갱신해야 한다.
 * 7인 이상은 쓰지 않는다(온보딩은 "6명 이상"까지만 묻는다).
 */
export const MEDIAN_INCOME_YEAR = 2026;
export const MEDIAN_MONTHLY_INCOME: Record<number, number> = {
  1: 2_564_238,
  2: 4_199_292,
  3: 5_359_036,
  4: 6_494_738,
  5: 7_556_719,
  6: 8_555_952,
};

/**
 * 정책 데이터의 소득 조건은 기준 중위소득 50·75·100·200% 이하뿐이라, 이 경계로 나눈 구간의 윗값을
 * 보내면 판정 결과가 정확히 맞는다. 200% 초과 구간은 250으로 보낸다.
 */
export const INCOME_BRACKET_PERCENTS = [50, 75, 100, 200] as const;
export const OVER_TOP_BRACKET_PERCENT = 250;

const toManwon = (won: number) =>
  Math.floor(won / 10_000).toLocaleString('ko-KR');

export type IncomeBracketOption = { value: IncomeBracket; label: string };

/** 가구원 수에 맞춘 월 소득 구간 선택지(금액 표시). "잘 모르겠어요"는 포함하지 않는다. */
export const getIncomeBracketOptions = (
  householdSize: number
): IncomeBracketOption[] => {
  const size = Math.min(Math.max(householdSize, 1), MAX_HOUSEHOLD_SIZE);
  const median = MEDIAN_MONTHLY_INCOME[size];
  const options: IncomeBracketOption[] = [];
  let previousAmount: number | null = null;

  for (const percent of INCOME_BRACKET_PERCENTS) {
    const amount = (median * percent) / 100;
    options.push({
      value: percent,
      label:
        previousAmount === null
          ? `월 ${toManwon(amount)}만원 이하`
          : `월 ${toManwon(previousAmount)}만 ~ ${toManwon(amount)}만원`,
    });
    previousAmount = amount;
  }

  options.push({
    value: OVER_TOP_BRACKET_PERCENT,
    label: `월 ${toManwon(previousAmount ?? median)}만원 초과`,
  });
  return options;
};

export const UNKNOWN_INCOME_LABEL = '잘 모르겠어요';
