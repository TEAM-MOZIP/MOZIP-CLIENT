import {
  getIncomeBracketOptions,
  UNKNOWN_INCOME_LABEL,
} from '@pages/onboarding/constants/medianIncome';
import type { IncomeBracket } from '@pages/onboarding/types/onboarding';

type IncomeStepProps = {
  householdSize: number;
  value: IncomeBracket | null;
  showParentIncomeHint?: boolean;
  onChange: (bracket: IncomeBracket) => void;
};

const IncomeStep = ({
  householdSize,
  value,
  showParentIncomeHint = false,
  onChange,
}: IncomeStepProps) => {
  const options = [
    ...getIncomeBracketOptions(householdSize),
    { value: 'UNKNOWN' as const, label: UNKNOWN_INCOME_LABEL },
  ];

  return (
    <div className="flex w-full flex-col">
      <div
        role="radiogroup"
        aria-label="한 달 소득 구간"
        className="flex w-full flex-col gap-[0.8rem]"
      >
        {options.map((option) => {
          const selected = value === option.value;
          const isUnknown = option.value === 'UNKNOWN';

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={[
                'flex w-full cursor-pointer items-center gap-[1.2rem] rounded-[1.4rem] border-[0.15rem] bg-white px-[1.8rem] py-[1.5rem] text-left text-body-3 text-gray-800 transition-colors',
                isUnknown ? 'border-dashed' : '',
                selected
                  ? 'border-gray-700 font-bold'
                  : 'border-gray-200 hover:border-gray-400',
              ].join(' ')}
            >
              <span
                aria-hidden
                className={[
                  'size-[2rem] shrink-0 rounded-full',
                  selected
                    ? 'border-[0.6rem] border-gray-700'
                    : 'border-[0.15rem] border-gray-300',
                ].join(' ')}
              />
              {option.label}
              {isUnknown && (
                <span className="ml-auto text-caption font-medium text-gray-500">
                  소득 조건은 &quot;확인 필요&quot;로 보여드려요
                </span>
              )}
            </button>
          );
        })}
      </div>

      {showParentIncomeHint && (
        <p className="mt-[1.6rem] w-full rounded-[1.2rem] bg-primary-sub-3 px-[1.4rem] py-[1.2rem] text-caption text-gray-700">
          부모님과 함께 산다면 부모님 소득도 합쳐서 골라주세요. 잘 모르겠다면
          &apos;잘 모르겠어요&apos;도 괜찮아요.
        </p>
      )}
    </div>
  );
};

export default IncomeStep;
