import type { ComponentProps } from 'react';

type DuplicateCheckButtonProps = Omit<ComponentProps<'button'>, 'type'>;

const DuplicateCheckButton = ({
  className,
  children = '중복 확인',
  ...props
}: DuplicateCheckButtonProps) => {
  return (
    <button
      type="button"
      className={[
        'h-[5.4rem] shrink-0 cursor-pointer rounded-[0.8rem] bg-gray-500 px-[1.6rem] text-body-3 font-semibold whitespace-nowrap text-white transition-all duration-300 ease-in-out hover:brightness-110',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};

export default DuplicateCheckButton;
