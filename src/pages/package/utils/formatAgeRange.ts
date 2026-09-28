/** 정책 대상 나이 범위를 카드 칩 문구로: 만 19~39세 / 만 18세 이하 / 만 65세 이상 / 연령 무관 */
export const formatAgeRange = (min: number | null, max: number | null) => {
  if (min !== null && max !== null) {
    return min === max ? `만 ${min}세` : `만 ${min}~${max}세`;
  }
  if (max !== null) return `만 ${max}세 이하`;
  if (min !== null) return `만 ${min}세 이상`;
  return '연령 무관';
};
