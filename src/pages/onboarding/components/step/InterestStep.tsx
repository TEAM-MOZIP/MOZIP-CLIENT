import { INTEREST_OPTIONS } from '@pages/onboarding/constants/interests';

type InterestStepProps = {
  selectedIds: string[];
  onToggle: (id: string) => void;
};

const InterestStep = ({ selectedIds, onToggle }: InterestStepProps) => {
  return (
    <div className="grid w-full max-w-[64rem] grid-cols-3 gap-[2.8rem]">
      {INTEREST_OPTIONS.map((option) => {
        const selected = selectedIds.includes(option.id);

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onToggle(option.id)}
            className={[
              'flex flex-col items-center justify-center gap-[1.6rem] rounded-[1.2rem] border-2 border-primary px-[4rem] py-[2rem] transition-colors',
              selected ? 'bg-primary-sub-2' : 'bg-white hover:bg-primary-sub-2',
            ].join(' ')}
          >
            <img
              src={option.icon}
              alt=""
              aria-hidden
              draggable={false}
              className="size-[4.4rem] object-contain"
            />
            <span className="text-heading-4 text-gray-700">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default InterestStep;
