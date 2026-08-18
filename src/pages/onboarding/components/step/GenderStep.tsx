import { GENDER_OPTIONS } from '@pages/onboarding/constants/genders';
import type { Gender } from '@pages/onboarding/types/onboarding';

type GenderStepProps = {
  value: Gender | null;
  onChange: (gender: Gender) => void;
};

const GenderStep = ({ value, onChange }: GenderStepProps) => {
  return (
    <div className="flex gap-[2.8rem]">
      {GENDER_OPTIONS.map((option) => {
        const selected = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={[
              'px-[4rem] py-[1rem] rounded-[1.2rem] border-2 text-heading-3 transition-colors',
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
  );
};

export default GenderStep;
