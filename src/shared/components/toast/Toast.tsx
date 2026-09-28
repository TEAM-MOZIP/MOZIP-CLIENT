import { useState } from 'react';

type ToastProps = {
  message: string | null;
  className?: string;
};

const Toast = ({ message, className }: ToastProps) => {
  const [displayedMessage, setDisplayedMessage] = useState<string | null>(
    message
  );

  if (message && message !== displayedMessage) {
    setDisplayedMessage(message);
  }

  const content = message ?? displayedMessage;
  if (!content) return null;

  return (
    <p
      role="status"
      onTransitionEnd={(event) => {
        if (event.propertyName !== 'opacity' || message) return;
        setDisplayedMessage(null);
      }}
      className={[
        'pointer-events-none fixed bottom-[4rem] left-1/2 z-[300] -translate-x-1/2 whitespace-nowrap rounded-[1.2rem] bg-black/70 px-[1.4rem] py-[0.8rem] text-body-3 font-medium text-white transition-opacity duration-300 ease-out',
        message ? 'opacity-100' : 'opacity-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {content}
    </p>
  );
};

export default Toast;
