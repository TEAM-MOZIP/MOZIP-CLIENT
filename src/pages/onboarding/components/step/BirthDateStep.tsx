import { useState, useEffect, useRef, useCallback } from 'react';
import { MIN_BIRTH_YEAR } from '@pages/onboarding/constants/onboarding';
import { getAgeFromBirthDate } from '@pages/package/utils/getAgeGroup';

type BirthDateStepProps = {
  value: string | null; // 'YYYY-MM-DD'
  onChange: (birthDate: string) => void;
};

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from(
  { length: CURRENT_YEAR - MIN_BIRTH_YEAR + 1 },
  (_, i) => CURRENT_YEAR - i
);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

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

const pad = (n: number) => String(n).padStart(2, '0');

// ── 커스텀 드롭다운 ──────────────────────────────────────────────────────────

type DropdownOption = { value: number; label: string };

type DateDropdownProps = {
  label: string;
  placeholder: string;
  value: number | null;
  options: DropdownOption[];
  onChange: (value: number) => void;
  ariaLabel: string;
};

const ChevronIcon = ({ open }: { open: boolean }) => (
  <svg
    aria-hidden
    viewBox="0 0 12 8"
    className={`w-[1.1rem] shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path
      d="M1 1l5 5 5-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DateDropdown = ({
  label,
  placeholder,
  value,
  options,
  onChange,
  ariaLabel,
}: DateDropdownProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selectedRef = useRef<HTMLLIElement>(null);

  const hasValue = value !== null;
  const selectedLabel = options.find((o) => o.value === value)?.label ?? null;

  // 외부 클릭 시 닫기
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // 열릴 때 선택된 항목으로 스크롤
  useEffect(() => {
    if (!open) return;
    // rAF로 렌더 후 스크롤
    const id = requestAnimationFrame(() => {
      selectedRef.current?.scrollIntoView({ block: 'center' });
    });
    return () => cancelAnimationFrame(id);
  }, [open]);

  const handleSelect = useCallback(
    (v: number) => {
      onChange(v);
      setOpen(false);
    },
    [onChange]
  );

  // 키보드 지원
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'Enter' || e.key === ' ') setOpen((prev) => !prev);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex min-w-0 flex-1 flex-col gap-[0.8rem]"
    >
      {/* 라벨 */}
      <span
        className={`pl-[0.2rem] text-caption font-semibold transition-colors ${
          hasValue ? 'text-gray-700' : 'text-gray-400'
        }`}
      >
        {label}
      </span>

      {/* 트리거 버튼 */}
      <button
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        className={[
          'flex h-[6.4rem] w-full cursor-pointer items-center justify-between rounded-[1.2rem] border-[0.15rem] px-[1.4rem] transition-all',
          open
            ? 'border-primary bg-white ring-[0.3rem] ring-primary/10'
            : hasValue
              ? 'border-gray-300 bg-white hover:border-gray-400'
              : 'border-gray-200 bg-gray-50 hover:border-gray-300',
        ].join(' ')}
      >
        <span
          className={`text-body-2 font-semibold ${hasValue ? 'text-gray-800' : 'text-gray-400'}`}
        >
          {selectedLabel ?? placeholder}
        </span>
        <span className={hasValue ? 'text-gray-600' : 'text-gray-300'}>
          <ChevronIcon open={open} />
        </span>
      </button>

      {/* 드롭다운 리스트 */}
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute top-[calc(100%+0.6rem)] left-0 z-50 max-h-[24rem] w-full overflow-y-auto rounded-[1.2rem] border border-gray-100 bg-white py-[0.6rem] shadow-[0_0.8rem_2.4rem_rgba(0,0,0,0.12)]"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#e5e7eb transparent',
          }}
        >
          {options.map((opt) => {
            const selected = opt.value === value;
            return (
              <li
                key={opt.value}
                ref={selected ? selectedRef : null}
                role="option"
                aria-selected={selected}
                onClick={() => handleSelect(opt.value)}
                className={[
                  'flex cursor-pointer items-center justify-between px-[1.6rem] py-[1rem] text-body-3 font-medium transition-colors',
                  selected
                    ? 'bg-primary-sub-3 font-semibold text-gray-800'
                    : 'text-gray-700 hover:bg-gray-50',
                ].join(' ')}
              >
                {opt.label}
                {selected && (
                  <svg
                    viewBox="0 0 12 10"
                    className="w-[1.2rem] text-primary"
                    fill="none"
                  >
                    <path
                      d="M1 5l3.5 3.5L11 1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// ── BirthDateStep ────────────────────────────────────────────────────────────

const BirthDateStep = ({ value, onChange }: BirthDateStepProps) => {
  const [{ year, month, day }, setDraft] = useState<BirthDateDraft>(() =>
    parseBirthDate(value)
  );

  const days = year && month ? getDaysInMonth(year, month) : 31;
  const age = value ? getAgeFromBirthDate(value) : null;

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

  const yearOptions = YEARS.map((y) => ({ value: y, label: `${y}년` }));
  const monthOptions = MONTHS.map((m) => ({ value: m, label: `${m}월` }));
  const dayOptions = Array.from({ length: days }, (_, i) => i + 1).map((d) => ({
    value: d,
    label: `${d}일`,
  }));

  return (
    <div className="w-full">
      <div className="flex w-full items-end gap-[1rem]">
        <DateDropdown
          label="출생연도"
          placeholder="년"
          ariaLabel="출생연도"
          value={year}
          options={yearOptions}
          onChange={(y) => handleChange(y, month, day)}
        />
        <DateDropdown
          label="월"
          placeholder="월"
          ariaLabel="출생월"
          value={month}
          options={monthOptions}
          onChange={(m) => handleChange(year, m, day)}
        />
        <DateDropdown
          label="일"
          placeholder="일"
          ariaLabel="출생일"
          value={day}
          options={dayOptions}
          onChange={(d) => handleChange(year, month, d)}
        />
      </div>

      {age !== null && (
        <div className="mt-[1.6rem] flex items-center gap-[0.8rem]">
          <span className="inline-flex items-center gap-[0.4rem] rounded-full border border-[#C9B8FF] bg-[#EEE8FF] px-[1.2rem] py-[0.4rem] text-caption font-semibold text-gray-700">
            <svg
              viewBox="0 0 16 16"
              className="w-[1.2rem] text-[#9B7EFF]"
              fill="currentColor"
            >
              <circle cx="8" cy="8" r="8" opacity="0.2" />
              <circle cx="8" cy="8" r="4" />
            </svg>
            만 {age}세
          </span>
          <span className="text-caption text-gray-400">로 인식했어요</span>
        </div>
      )}
    </div>
  );
};

export default BirthDateStep;
