import { useId, useState, type ComponentProps, type ReactNode } from 'react';
import eyeIcon from '@shared/assets/icons/eye.svg';
import eyeOffIcon from '@shared/assets/icons/eye-off.svg';
import {
  getAuthFieldValidationError,
  type AuthFieldValidation,
} from '@shared/utils/authValidation';

type InputFieldType = 'email' | 'text' | 'password';

type InputFieldProps = {
  label: string;
  type?: InputFieldType;
  validate?: AuthFieldValidation;
  compareValue?: string;
  errorMessage?: string;
  helperMessage?: string;
  sideButton?: ReactNode;
  suffix?: ReactNode;
} & Omit<ComponentProps<'input'>, 'type'>;

const InputField = ({
  label,
  type = 'text',
  id,
  className,
  value,
  validate,
  compareValue,
  errorMessage,
  helperMessage,
  sideButton,
  suffix,
  onBlur,
  ...props
}: InputFieldProps) => {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const [showPassword, setShowPassword] = useState(false);
  const descriptionId = useId();
  const [touched, setTouched] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const validationError = touched
    ? getAuthFieldValidationError(validate, String(value ?? ''), compareValue)
    : undefined;

  const error = errorMessage ?? validationError;
  const description = error ?? helperMessage;

  return (
    <div className={['flex w-full flex-col gap-[1.2rem]', className].join(' ')}>
      <label htmlFor={inputId} className="text-body-3 font-medium text-black">
        {label}
      </label>

      <div className="flex w-full flex-col gap-[0.8rem]">
        <div className="flex w-full items-center gap-[0.8rem]">
          <div className="relative min-w-0 flex-1">
            <input
              id={inputId}
              type={inputType}
              value={value}
              aria-invalid={error ? true : undefined}
              aria-describedby={description ? descriptionId : undefined}
              onBlur={(event) => {
                setTouched(true);
                onBlur?.(event);
              }}
              className={[
                'h-[5.4rem] w-full rounded-[0.8rem] border border-gray-400 bg-white px-[1.6rem] text-body-3 text-black outline-none transition-colors placeholder:text-gray-400 focus:border-gray-600',
                isPassword ? 'pr-[4.4rem]' : '',
                suffix ? 'pr-[5.6rem]' : '',
              ].join(' ')}
              {...props}
            />

            {suffix && (
              <div className="pointer-events-none absolute top-1/2 right-[1.6rem] -translate-y-1/2">
                {suffix}
              </div>
            )}

            {isPassword && (
              <button
                type="button"
                aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-[1.6rem] -translate-y-1/2 cursor-pointer p-[0.4rem]"
              >
                <img
                  src={showPassword ? eyeOffIcon : eyeIcon}
                  alt=""
                  className="size-[2rem]"
                  aria-hidden
                  draggable={false}
                />
              </button>
            )}
          </div>

          {sideButton}
        </div>

        {description && (
          <p
            id={descriptionId}
            role={error ? 'alert' : undefined}
            className={[
              'text-caption',
              error ? 'text-point' : 'text-gray-500',
            ].join(' ')}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default InputField;
