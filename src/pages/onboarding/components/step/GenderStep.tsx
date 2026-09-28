import OptionCard from '@pages/onboarding/components/OptionCard';
import { GENDER_OPTIONS } from '@pages/onboarding/constants/genders';
import type { Gender } from '@pages/onboarding/types/onboarding';

type GenderStepProps = {
  value: Gender | null;
  onChange: (gender: Gender) => void;
};

const GenderStep = ({ value, onChange }: GenderStepProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-[1.2rem]">
      {GENDER_OPTIONS.map((option) => (
        <OptionCard
          key={option.id}
          label={option.label}
          selected={value === option.id}
          onClick={() => onChange(option.id)}
        />
      ))}
    </div>
  );
};

export default GenderStep;
