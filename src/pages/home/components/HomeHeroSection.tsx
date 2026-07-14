import heroWatermark from '@shared/assets/hero-watermark.svg';
import { useTypingAnimation } from '@pages/home/hooks/useTypingAnimation';

const HERO_COPY = '나를 위한 혜택 모음집, 신청까지 한 번에';

const HERO_TYPING_PAUSES = [
  {
    afterIndex: Array.from('나를 위한 혜택 모음집,').length,
    duration: 500,
  },
] as const;

const HomeHeroSection = () => {
  const { displayedText, isComplete } = useTypingAnimation({
    text: HERO_COPY,
    speed: 90,
    startDelay: 400,
    pauses: HERO_TYPING_PAUSES,
  });

  return (
    <section className="relative flex min-h-[calc(100dvh-8.1rem)] w-full flex-col overflow-hidden">
      <div className="flex flex-1 flex-col justify-start px-16 pt-[10rem]">
        <h1
          className="text-center text-heading-1 text-title"
          aria-label={HERO_COPY}
        >
          {displayedText}
          {!isComplete && (
            <span
              className="ml-[0.2rem] inline-block w-[0.12em] animate-pulse bg-current align-middle"
              style={{ height: '0.9em' }}
              aria-hidden
            />
          )}
        </h1>
      </div>

      <img
        src={heroWatermark}
        alt=""
        aria-hidden
        className="block w-full shrink-0 pb-[15rem]"
        draggable={false}
      />
    </section>
  );
};

export default HomeHeroSection;
