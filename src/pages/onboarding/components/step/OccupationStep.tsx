import OptionCard from '@pages/onboarding/components/OptionCard';
import { OCCUPATION_OPTIONS } from '@pages/onboarding/constants/occupations';
import type { Occupation } from '@pages/onboarding/types/onboarding';

type OccupationStepProps = {
  value: Occupation | null;
  onChange: (occupation: Occupation) => void;
};

const OccupationStep = ({ value, onChange }: OccupationStepProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-[1.2rem] md:grid-cols-3">
      {OCCUPATION_OPTIONS.map((option) => (
        <OptionCard
          key={option.id}
          label={option.label}
          description={option.description}
          selected={value === option.id}
          onClick={() => onChange(option.id)}
        />
      ))}
    </div>
  );
};

export default OccupationStep;
