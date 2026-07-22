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
    <section className="bg-hero-gradient relative flex min-h-[calc(100dvh-8.1rem)] w-full flex-col overflow-hidden py-[15rem]">
      <style>{`
        @keyframes mozip-typing-cursor-blink {
          50% {
            opacity: 0;
          }
        }
      `}</style>

      <div className="flex flex-1 flex-col justify-start px-16">
        <h1
          className="text-center text-[3.3rem] font-semibold text-title"
          aria-label={HERO_COPY}
        >
          {displayedText}
          <span
            className={`ml-[0.2em] inline-block w-[0.1em] bg-current align-middle transition-opacity duration-1000 ease-out ${
              isComplete
                ? 'opacity-0'
                : 'animate-[mozip-typing-cursor-blink_1s_steps(2,start)_infinite] opacity-100'
            }`}
            style={{ height: '1em' }}
            aria-hidden
          />
        </h1>
      </div>

      <img
        src={heroWatermark}
        alt=""
        aria-hidden
        className="block w-full shrink-0"
        draggable={false}
      />
    </section>
  );
};

export default HomeHeroSection;
