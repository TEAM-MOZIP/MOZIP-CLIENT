import { useEffect, useRef } from 'react';

import HomeHeroSection from '@pages/home/components/HomeHeroSection';
import HomeContentSection from '@pages/home/components/HomeContentSection';
import HomeSubscriptionSection from '@pages/home/components/HomeSubscriptionSection';
import HomeFeatureCardsSection from '@pages/home/components/HomeFeatureCardsSection';

const HEADER_HEIGHT_PX = 81;
const WHEEL_INTENT_THRESHOLD = 8;
const SETTLE_THRESHOLD_PX = 2;
const GESTURE_COOLDOWN_MS = 180;
const MAX_ANIMATION_MS = 1200;

const toSnapScrollY = (sectionTop: number) =>
  Math.max(0, sectionTop - HEADER_HEIGHT_PX);

const isSettledAt = (scrollY: number, targetY: number) =>
  Math.abs(scrollY - targetY) <= SETTLE_THRESHOLD_PX;

const getSectionTops = (elements: Array<HTMLElement | null>) =>
  elements
    .map((el) => (el ? el.getBoundingClientRect().top + window.scrollY : null))
    .filter((top): top is number => top !== null);

const getActiveSectionIndex = (tops: number[]) => {
  const anchorY = window.scrollY + HEADER_HEIGHT_PX + 1;
  let activeIndex = 0;

  for (let i = 1; i < tops.length; i++) {
    const currentDistance = Math.abs(tops[i]! - anchorY);
    const activeDistance = Math.abs(tops[activeIndex]! - anchorY);
    if (currentDistance < activeDistance) {
      activeIndex = i;
    }
  }

  return activeIndex;
};

const clampIndex = (index: number, maxIndex: number) =>
  Math.min(Math.max(index, 0), maxIndex);

const HomePage = () => {
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    let unlockTimer: ReturnType<typeof window.setTimeout> | undefined;
    let settleRaf: number | undefined;
    let targetScrollY: number | null = null;

    const readSectionTops = () => getSectionTops(sectionRefs.current);

    const clearTimers = () => {
      if (unlockTimer !== undefined) window.clearTimeout(unlockTimer);
      if (settleRaf !== undefined) window.cancelAnimationFrame(settleRaf);
      unlockTimer = undefined;
      settleRaf = undefined;
    };

    const releaseLock = () => {
      clearTimers();
      unlockTimer = window.setTimeout(() => {
        isAnimatingRef.current = false;
        targetScrollY = null;
        unlockTimer = undefined;
      }, GESTURE_COOLDOWN_MS);
    };

    const waitUntilSettled = () => {
      const startedAt = performance.now();

      const tick = () => {
        if (
          targetScrollY === null ||
          isSettledAt(window.scrollY, targetScrollY) ||
          performance.now() - startedAt > MAX_ANIMATION_MS
        ) {
          releaseLock();
          return;
        }

        settleRaf = window.requestAnimationFrame(tick);
      };

      settleRaf = window.requestAnimationFrame(tick);
    };

    const scrollToIndex = (index: number) => {
      const tops = readSectionTops();
      if (tops.length === 0) return false;

      const nextY = toSnapScrollY(tops[clampIndex(index, tops.length - 1)]!);
      if (isSettledAt(window.scrollY, nextY)) return false;

      clearTimers();
      isAnimatingRef.current = true;
      targetScrollY = nextY;
      window.scrollTo({ top: nextY, behavior: 'smooth' });
      waitUntilSettled();
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      const tops = readSectionTops();
      if (tops.length === 0) return;

      const lastIndex = tops.length - 1;
      const lastSnapY = toSnapScrollY(tops[lastIndex]!);
      const scrollingDown = e.deltaY > 0;

      if (isAnimatingRef.current) {
        e.preventDefault();
        return;
      }

      if (window.scrollY > lastSnapY + SETTLE_THRESHOLD_PX) return;

      if (Math.abs(e.deltaY) < WHEEL_INTENT_THRESHOLD) {
        e.preventDefault();
        return;
      }

      const activeIndex = getActiveSectionIndex(tops);
      if (activeIndex === lastIndex && scrollingDown) return;

      e.preventDefault();

      const nextIndex = activeIndex + (scrollingDown ? 1 : -1);
      if (nextIndex < 0 || nextIndex > lastIndex) return;

      scrollToIndex(nextIndex);
    };

    window.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      clearTimers();
      isAnimatingRef.current = false;
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <div>
      <div
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        data-home-section="hero"
      >
        <HomeHeroSection />
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        data-home-section="content"
      >
        <HomeContentSection />
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        data-home-section="subscription"
      >
        <HomeSubscriptionSection />
      </div>
      <div
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        data-home-section="feature-cards"
      >
        <HomeFeatureCardsSection />
      </div>
    </div>
  );
};

export default HomePage;
