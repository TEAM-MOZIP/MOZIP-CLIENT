import { INCOME_TYPE_OPTIONS } from '@pages/onboarding/constants/incomeTypes';
import type { IncomeType } from '@pages/onboarding/types/onboarding';

type IncomeStepProps = {
  incomeType: IncomeType | null;
  incomeValue: number | null;
  onChangeType: (incomeType: IncomeType) => void;
  onChangeValue: (incomeValue: number | null) => void;
};

const IncomeStep = ({
  incomeType,
  incomeValue,
  onChangeType,
  onChangeValue,
}: IncomeStepProps) => {
  const selectedOption = INCOME_TYPE_OPTIONS.find(
    (option) => option.id === incomeType
  );

  return (
    <div className="flex w-full max-w-[40rem] flex-col items-center gap-[3.2rem]">
      <div className="flex gap-[1.6rem]">
        {INCOME_TYPE_OPTIONS.map((option) => {
          const selected = incomeType === option.id;

          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onChangeType(option.id)}
              className={[
                'rounded-[1.2rem] border-2 px-[2.4rem] py-[1rem] text-heading-4 transition-colors',
                selected
                  ? 'border-primary bg-primary-sub-2 text-black'
                  : 'border-primary bg-white text-black hover:bg-primary-sub-2',
              ].join(' ')}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <label className="relative w-full">
        <span className="sr-only">소득 값 입력</span>
        <input
          type="text"
          inputMode="numeric"
          disabled={!incomeType}
          value={incomeValue ?? ''}
          onChange={(event) => {
            const digitsOnly = event.target.value.replace(/\D/g, '');
            onChangeValue(digitsOnly === '' ? null : Number(digitsOnly));
          }}
          placeholder={incomeType ? '0' : '소득 유형을 먼저 선택해주세요.'}
          className="h-[5.4rem] w-full rounded-[0.8rem] border border-gray-400 bg-white px-[1.6rem] pr-[4.8rem] text-body-2 text-black outline-none placeholder:text-gray-500 disabled:bg-gray-100"
        />
        {selectedOption && (
          <span className="pointer-events-none absolute top-1/2 right-[1.6rem] -translate-y-1/2 text-body-3 text-gray-500">
            {selectedOption.unit}
          </span>
        )}
      </label>
    </div>
  );
};

export default IncomeStep;
