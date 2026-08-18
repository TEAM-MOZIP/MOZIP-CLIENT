import SelectionChip from '@pages/onboarding/components/SelectionChip';
import { SITUATIONS_BY_AGE_GROUP } from '@pages/onboarding/constants/situations';
import type { AgeGroup } from '@pages/onboarding/types/onboarding';

type SituationStepProps = {
  ageGroup: AgeGroup;
  selectedIds: string[];
  onToggle: (id: string) => void;
};

const SituationStep = ({
  ageGroup,
  selectedIds,
  onToggle,
}: SituationStepProps) => {
  const categories = SITUATIONS_BY_AGE_GROUP[ageGroup];

  return (
    <div className="flex w-full max-w-[80rem] flex-col items-center gap-[4.4rem]">
      {categories.map((category) => (
        <section
          key={category.id}
          className="flex w-full flex-col items-center gap-[1.4rem]"
        >
          <h2 className="text-heading-4 text-gray-800">{category.label}</h2>
          <div className="flex flex-wrap justify-center gap-[2rem]">
            {category.options.map((option) => (
              <SelectionChip
                key={option.id}
                label={option.label}
                selected={selectedIds.includes(option.id)}
                onClick={() => onToggle(option.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default SituationStep;
