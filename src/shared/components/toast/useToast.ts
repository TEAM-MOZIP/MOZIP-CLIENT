import { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DURATION_MS = 1800;

export const useToast = (duration = DEFAULT_DURATION_MS) => {
  const [message, setMessage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  const showToast = useCallback(
    (nextMessage: string) => {
      setMessage(nextMessage);
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setMessage(null);
      }, duration);
    },
    [duration]
  );

  useEffect(
    () => () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    },
    []
  );

  return { message, showToast };
};
