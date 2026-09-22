import { EMPLOYMENT_STATUS_OPTIONS } from '@pages/onboarding/constants/employmentStatuses';
import type { EmploymentStatus } from '@pages/onboarding/types/onboarding';

type EmploymentStatusStepProps = {
  value: EmploymentStatus | null;
  onChange: (status: EmploymentStatus) => void;
};

const EmploymentStatusStep = ({
  value,
  onChange,
}: EmploymentStatusStepProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-[2rem]">
      {EMPLOYMENT_STATUS_OPTIONS.map((option) => {
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

export default EmploymentStatusStep;
