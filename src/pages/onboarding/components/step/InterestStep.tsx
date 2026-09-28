import OptionCard from '@pages/onboarding/components/OptionCard';
import { INTEREST_OPTIONS } from '@pages/onboarding/constants/interests';

type InterestStepProps = {
  selectedIds: string[];
  onToggle: (id: string) => void;
};

const InterestStep = ({ selectedIds, onToggle }: InterestStepProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-[1.2rem] md:grid-cols-3">
      {INTEREST_OPTIONS.map((option) => (
        <OptionCard
          key={option.id}
          label={option.label}
          selected={selectedIds.includes(option.id)}
          onClick={() => onToggle(option.id)}
          icon={
            <img
              src={option.icon}
              alt=""
              aria-hidden
              draggable={false}
              className="size-[3.6rem] object-contain"
            />
          }
        />
      ))}
    </div>
  );
};

export default InterestStep;
