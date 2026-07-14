import { useEffect, useRef, useState } from 'react';

type UseScrollRevealOptions = {
  /** 뷰포트에 들어온 비율 (0~1) */
  threshold?: number;
  /** Observer rootMargin */
  rootMargin?: string;
  /** 뷰포트 진입 후 애니메이션 시작까지 대기 (ms) */
  revealDelay?: number;
  /** 한 번만 재생 */
  triggerOnce?: boolean;
};

type GetContainerPropsOptions = {
  /** 등장 애니메이션 길이 (ms) */
  duration?: number;
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const useScrollReveal = ({
  threshold = 0.18,
  rootMargin = '0px 0px -14% 0px',
  revealDelay = 60,
  triggerOnce = true,
}: UseScrollRevealOptions = {}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const skipAnimation = prefersReducedMotion();

  useEffect(() => {
    if (skipAnimation) {
      return;
    }

    const element = ref.current;
    if (!element) return;

    let revealTimer: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = setTimeout(() => {
            setIsVisible(true);
            if (triggerOnce) observer.disconnect();
          }, revealDelay);
          return;
        }

        clearTimeout(revealTimer);

        if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      clearTimeout(revealTimer);
      observer.disconnect();
    };
  }, [threshold, rootMargin, revealDelay, triggerOnce, skipAnimation]);

  const visible = skipAnimation || isVisible;

  const getContainerProps = ({
    duration = 700,
  }: GetContainerPropsOptions = {}) => ({
    className: [
      'transition-all ease-out will-change-[transform,opacity]',
      visible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0',
    ].join(' '),
    style: {
      transitionDuration: `${duration}ms`,
    },
  });

  return { ref, isVisible: visible, getContainerProps };
};
