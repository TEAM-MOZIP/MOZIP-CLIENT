import { MAX_AGE, MIN_AGE } from '@pages/onboarding/constants/onboarding';
import ageMinusIcon from '@shared/assets/icons/age-minus.svg';
import agePlusIcon from '@shared/assets/icons/age-plus.svg';

type AgeStepProps = {
  age: number;
  onChange: (age: number) => void;
};

const AgeStep = ({ age, onChange }: AgeStepProps) => {
  const canDecrease = age > MIN_AGE;
  const canIncrease = age < MAX_AGE;

  return (
    <div className="flex items-center gap-[4rem]">
      <button
        type="button"
        aria-label="-"
        disabled={!canDecrease}
        onClick={() => onChange(age - 1)}
        className="flex size-[4.8rem] items-center justify-center opacity-70 transition-opacity enabled:hover:opacity-100 disabled:cursor-not-allowed"
      >
        <img
          src={ageMinusIcon}
          alt=""
          aria-hidden
          draggable={false}
          className="size-[3.2rem]"
        />
      </button>

      <span className="text-center text-[6.8rem] font-semibold tracking-[-0.04em] text-primary tabular-nums">
        {age}
      </span>

      <button
        type="button"
        aria-label="+"
        disabled={!canIncrease}
        onClick={() => onChange(age + 1)}
        className="flex size-[4.8rem] items-center justify-center opacity-70 transition-opacity enabled:hover:opacity-100 disabled:cursor-not-allowed"
      >
        <img
          src={agePlusIcon}
          alt=""
          aria-hidden
          draggable={false}
          className="size-[3.2rem]"
        />
      </button>
    </div>
  );
};

export default AgeStep;
