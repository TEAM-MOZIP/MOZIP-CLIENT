import SelectionChip from '@pages/onboarding/components/SelectionChip';
import {
  HOUSEHOLD_SPECIAL_OPTIONS,
  NO_HOUSEHOLD_SPECIAL_LABEL,
} from '@pages/onboarding/constants/household';
import type { HouseholdSpecial } from '@pages/onboarding/types/onboarding';

type HouseholdSpecialStepProps = {
  value: HouseholdSpecial[];
  onToggle: (special: HouseholdSpecial) => void;
  onClear: () => void;
};

const HouseholdSpecialStep = ({
  value,
  onToggle,
  onClear,
}: HouseholdSpecialStepProps) => {
  return (
    <div className="flex flex-wrap gap-[0.8rem]">
      {HOUSEHOLD_SPECIAL_OPTIONS.map((option) => (
        <SelectionChip
          key={option.id}
          label={option.label}
          selected={value.includes(option.id)}
          onClick={() => onToggle(option.id)}
        />
      ))}
      <SelectionChip
        label={NO_HOUSEHOLD_SPECIAL_LABEL}
        selected={value.length === 0}
        onClick={onClear}
      />
    </div>
  );
};

export default HouseholdSpecialStep;
