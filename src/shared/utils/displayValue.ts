export const EMPTY_VALUE = '-';

/** null·undefined·빈 문자열(공백만 있는 경우 포함)을 '-'로 바꿔 화면에 표시한다. */
export const displayValue = (value: string | null | undefined): string => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : EMPTY_VALUE;
};
