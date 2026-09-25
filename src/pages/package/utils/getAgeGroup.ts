import type { AgeGroup } from '@pages/package/types/package';

// 생년월일(YYYY-MM-DD)로 오늘 기준 만 나이를 구한다.
const getAgeFromBirthDate = (birthDate: string, today = new Date()) => {
  const [year, month, day] = birthDate.split('-').map(Number);
  if (!year || !month || !day) return null;

  let age = today.getFullYear() - year;
  const beforeBirthday =
    today.getMonth() + 1 < month ||
    (today.getMonth() + 1 === month && today.getDate() < day);
  if (beforeBirthday) age -= 1;
  return age >= 0 ? age : null;
};

// 서버 AgeGroup 구간(UNDER_19 = 0~18세 … AGE_65_PLUS)과 같은 경계를 쓴다.
const toAgeGroup = (age: number): AgeGroup => {
  if (age < 19) return 'UNDER_19';
  if (age <= 24) return 'AGE_19_24';
  if (age <= 29) return 'AGE_25_29';
  if (age <= 34) return 'AGE_30_34';
  if (age <= 49) return 'AGE_35_49';
  if (age <= 64) return 'AGE_50_64';
  return 'AGE_65_PLUS';
};

/** 프로필 생년월일이 속한 연령 구간. 생년월일이 없거나 잘못됐으면 null. */
export const getAgeGroupFromBirthDate = (
  birthDate: string | null | undefined
): AgeGroup | null => {
  if (!birthDate) return null;
  const age = getAgeFromBirthDate(birthDate);
  return age === null ? null : toAgeGroup(age);
};
