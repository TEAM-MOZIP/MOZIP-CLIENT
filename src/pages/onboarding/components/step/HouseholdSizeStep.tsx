import SelectionChip from '@pages/onboarding/components/SelectionChip';
import { HOUSEHOLD_SIZE_OPTIONS } from '@pages/onboarding/constants/household';

type HouseholdSizeStepProps = {
  value: number | null;
  onChange: (householdSize: number) => void;
};

const HouseholdSizeStep = ({ value, onChange }: HouseholdSizeStepProps) => {
  return (
    <div className="flex flex-wrap gap-[0.8rem]">
      {HOUSEHOLD_SIZE_OPTIONS.map((option) => (
        <SelectionChip
          key={option.value}
          label={option.label}
          selected={value === option.value}
          onClick={() => onChange(option.value)}
        />
      ))}
    </div>
  );
};

export default HouseholdSizeStep;
