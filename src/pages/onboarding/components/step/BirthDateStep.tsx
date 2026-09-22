import { useState } from 'react';
import { MIN_BIRTH_YEAR } from '@pages/onboarding/constants/onboarding';

type BirthDateStepProps = {
  value: string | null; // 'YYYY-MM-DD'
  onChange: (birthDate: string) => void;
};

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - MIN_BIRTH_YEAR + 1 },
  (_, index) => CURRENT_YEAR - index
);
const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1);

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

type BirthDateDraft = {
  year: number | null;
  month: number | null;
  day: number | null;
};

const parseBirthDate = (value: string | null): BirthDateDraft => {
  if (!value) return { year: null, month: null, day: null };
  const [year, month, day] = value.split('-').map(Number);
  return { year, month, day };
};

const pad = (value: number) => String(value).padStart(2, '0');

const selectClassName =
  'h-[5.4rem] rounded-[0.8rem] border border-gray-400 bg-white px-[1.6rem] text-body-2 text-black outline-none';

const BirthDateStep = ({ value, onChange }: BirthDateStepProps) => {
  // 년/월/일을 각각 골라 셋이 다 채워질 때까지는 부모 state(완성된 날짜 문자열)에
  // 반영할 수 없으므로, 선택 중간 상태는 로컬로 들고 있는다. 스텝을 벗어났다가
  // 돌아오면 컴포넌트가 다시 마운트되므로 초기값은 그때마다 value에서 새로 읽힌다.
  const [{ year, month, day }, setDraft] = useState<BirthDateDraft>(() =>
    parseBirthDate(value)
  );

  const days = year && month ? getDaysInMonth(year, month) : 31;

  const handleChange = (
    nextYear: number | null,
    nextMonth: number | null,
    nextDay: number | null
  ) => {
    setDraft({ year: nextYear, month: nextMonth, day: nextDay });

    if (!nextYear || !nextMonth || !nextDay) return;

    const maxDay = getDaysInMonth(nextYear, nextMonth);
    const safeDay = Math.min(nextDay, maxDay);
    onChange(`${nextYear}-${pad(nextMonth)}-${pad(safeDay)}`);
  };

  return (
    <div className="flex items-center gap-[1.6rem]">
      <select
        aria-label="출생연도"
        value={year ?? ''}
        onChange={(event) =>
          handleChange(Number(event.target.value), month, day)
        }
        className={selectClassName}
      >
        <option value="" disabled>
          년
        </option>
        {YEARS.map((y) => (
          <option key={y} value={y}>
            {y}년
          </option>
        ))}
      </select>

      <select
        aria-label="출생월"
        value={month ?? ''}
        onChange={(event) =>
          handleChange(year, Number(event.target.value), day)
        }
        className={selectClassName}
      >
        <option value="" disabled>
          월
        </option>
        {MONTHS.map((m) => (
          <option key={m} value={m}>
            {m}월
          </option>
        ))}
      </select>

      <select
        aria-label="출생일"
        value={day ?? ''}
        onChange={(event) =>
          handleChange(year, month, Number(event.target.value))
        }
        className={selectClassName}
      >
        <option value="" disabled>
          일
        </option>
        {Array.from({ length: days }, (_, index) => index + 1).map((d) => (
          <option key={d} value={d}>
            {d}일
          </option>
        ))}
      </select>
    </div>
  );
};

export default BirthDateStep;
