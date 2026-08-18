import { useState } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [inputAge, setInputAge] = useState(String(age));

  const applyAge = () => {
    const parsedAge = Number(inputAge);

    if (Number.isNaN(parsedAge)) {
      setInputAge(String(age));
      setIsEditing(false);
      return;
    }

    const nextAge = Math.min(MAX_AGE, Math.max(MIN_AGE, parsedAge));
    onChange(nextAge);
    setInputAge(String(nextAge));
    setIsEditing(false);
  };

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

      <input
        type="text"
        inputMode="numeric"
        maxLength={3}
        value={isEditing ? inputAge : String(age)}
        onChange={(event) => {
          const nextValue = event.target.value.replace(/\D/g, '');

          if (nextValue === '') {
            setInputAge(nextValue);
            return;
          }

          setInputAge(
            String(Math.min(MAX_AGE, Math.max(MIN_AGE, Number(nextValue))))
          );
        }}
        onFocus={(event) => {
          setIsEditing(true);
          setInputAge(String(age));
          event.target.select();
        }}
        onClick={(event) => event.currentTarget.select()}
        onBlur={applyAge}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            applyAge();
            event.currentTarget.blur();
          }

          if (event.key === 'Escape') {
            setInputAge(String(age));
            setIsEditing(false);
            event.currentTarget.blur();
          }
        }}
        aria-label="나이 입력"
        className="w-[14rem] bg-transparent text-center text-[6.8rem] font-semibold tracking-[-0.04em] text-primary tabular-nums outline-none selection:bg-primary-sub-3"
      />

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
