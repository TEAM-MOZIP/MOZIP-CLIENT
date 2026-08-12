import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';

type ChatLogoProps = {
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

const SIZE_STYLES = {
  sm: {
    icon: 'size-[2.8rem]',
    label: 'text-heading-4 font-medium text-gray-800',
    gap: 'gap-[0.8rem]',
  },
  md: {
    icon: 'size-[3.6rem]',
    label: 'text-heading-3 font-medium text-gray-800',
    gap: 'gap-[1.2rem]',
  },
} as const;

const ChatLogo = ({
  showLabel = true,
  size = 'sm',
  className,
}: ChatLogoProps) => {
  const styles = SIZE_STYLES[size];

  return (
    <div
      className={['inline-flex items-center', styles.gap, className]
        .filter(Boolean)
        .join(' ')}
      aria-label="Mozip AI"
    >
      <img
        src={mozipAiIcon}
        alt=""
        className={`${styles.icon} shrink-0`}
        draggable={false}
        aria-hidden
      />
      {showLabel && <span className={styles.label}>Mozip AI</span>}
    </div>
  );
};

export default ChatLogo;
