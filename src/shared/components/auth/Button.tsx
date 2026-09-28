import type { ComponentProps, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'kakao';

type ButtonProps = {
  variant?: ButtonVariant;
  leftIcon?: ReactNode;
} & ComponentProps<'button'>;

const variantClassName: Record<ButtonVariant, string> = {
  primary: 'bg-gray-800 text-white hover:bg-black/85',
  kakao: 'bg-[#FEE500] text-black hover:brightness-95',
};

const Button = ({
  type = 'button',
  variant = 'primary',
  leftIcon,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={[
        'flex h-[5.8rem] w-full cursor-pointer items-center justify-center gap-[0.8rem] rounded-[1.2rem] text-button-1 transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-white',
        variantClassName[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
};

export default Button;
