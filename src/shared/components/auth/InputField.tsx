import { useId, useState, type ComponentProps } from 'react';
import eyeIcon from '@shared/assets/icons/eye.svg';
import eyeOffIcon from '@shared/assets/icons/eye-off.svg';

type InputFieldType = 'email' | 'text' | 'password';

type InputFieldProps = {
  label: string;
  type?: InputFieldType;
} & Omit<ComponentProps<'input'>, 'type'>;

const InputField = ({
  label,
  type = 'text',
  id,
  className,
  ...props
}: InputFieldProps) => {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={['flex w-full flex-col gap-[1.2rem]', className].join(' ')}>
      <label htmlFor={inputId} className="text-body-3 font-medium text-black">
        {label}
      </label>

      <div className="relative w-full">
        <input
          id={inputId}
          type={inputType}
          className={[
            'h-[5.4rem] w-full rounded-[0.8rem] border border-gray-400 bg-white px-[1.6rem] text-body-3 text-black outline-none transition-colors placeholder:text-gray-400 focus:border-gray-600',
            isPassword ? 'pr-[4.4rem]' : '',
          ].join(' ')}
          {...props}
        />

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
    </div>
  );
};

export default InputField;
