import { useEffect, useState } from 'react';

export type TypingPause = {
  /** 이 글자 수까지 출력한 직후 멈춤 */
  afterIndex: number;
  /** 멈춤 시간 (ms) */
  duration: number;
};

type UseTypingAnimationOptions = {
  /** 출력할 전체 문구 */
  text: string;
  /** 글자당 간격 (ms) */
  speed?: number;
  /** 시작 전 대기 (ms) */
  startDelay?: number;
  /** 구간별 멈춤 */
  pauses?: readonly TypingPause[];
  /** false면 전체 문구를 즉시 표시 */
  enabled?: boolean;
};

type UseTypingAnimationResult = {
  displayedText: string;
  isComplete: boolean;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const getDelayAfterIndex = (
  index: number,
  speed: number,
  pauses: readonly TypingPause[]
) => {
  const pause = pauses.find((item) => item.afterIndex === index);
  return pause?.duration ?? speed;
};

export const useTypingAnimation = ({
  text,
  speed = 75,
  startDelay = 400,
  pauses = [],
  enabled = true,
}: UseTypingAnimationOptions): UseTypingAnimationResult => {
  const skipAnimation = !enabled || prefersReducedMotion();
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (skipAnimation) {
      return;
    }

    const characters = Array.from(text);
    let index = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const startTimer = setTimeout(() => {
      setDisplayedText('');
      setIsComplete(false);

      const typeNext = () => {
        if (index >= characters.length) {
          setIsComplete(true);
          return;
        }

        index += 1;
        setDisplayedText(characters.slice(0, index).join(''));
        const delay = getDelayAfterIndex(index, speed, pauses);
        timeouts.push(setTimeout(typeNext, delay));
      };

      typeNext();
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      timeouts.forEach(clearTimeout);
    };
  }, [text, speed, startDelay, pauses, enabled, skipAnimation]);

  if (skipAnimation) {
    return { displayedText: text, isComplete: true };
  }

  return { displayedText, isComplete };
};
