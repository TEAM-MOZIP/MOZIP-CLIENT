import { useScrollReveal } from '@pages/home/hooks/useScrollReveal';

import content0 from '@shared/assets/images/home/carousel/content-0.png';
import content1 from '@shared/assets/images/home/carousel/content-1.png';
import content2 from '@shared/assets/images/home/carousel/content-2.png';
import content3 from '@shared/assets/images/home/carousel/content-3.png';
import content4 from '@shared/assets/images/home/carousel/content-4.png';

const CARD_WIDTH_REM = 45;
const CARD_GAP_REM = 2.4;
const CARD_STEP_REM = CARD_WIDTH_REM + CARD_GAP_REM;
const CAROUSEL_DURATION_S = 25;

const FEATURED_CARDS = [
  { id: 'featured-0', image: content0 },
  { id: 'featured-1', image: content1 },
  { id: 'featured-2', image: content2 },
  { id: 'featured-3', image: content3 },
  { id: 'featured-4', image: content4 },
] as const;

const CARD_COUNT = FEATURED_CARDS.length;

const CAROUSEL_TRACK = [...[3, 4, 0, 1, 2], ...[3, 4, 0, 1, 2]] as const;

const CAROUSEL_START_INDEX = 2;
const CAROUSEL_LOOP_INDEX = CAROUSEL_START_INDEX + CARD_COUNT;
const CAROUSEL_START_OFFSET_REM = CAROUSEL_START_INDEX * CARD_STEP_REM;
const CAROUSEL_END_OFFSET_REM = CAROUSEL_LOOP_INDEX * CARD_STEP_REM;

const getCarouselTransform = (offsetRem: number) =>
  `translateX(calc(50cqw - ${CARD_WIDTH_REM / 2}rem - ${offsetRem}rem))`;

const HomeContentSection = () => {
  const { ref, getContainerProps } = useScrollReveal();
  const reveal = getContainerProps();

  return (
    <section className="relative flex min-h-[calc(100dvh-8.1rem)] w-full flex-col justify-center bg-primary-sub-2 pb-[6rem] pt-[6rem]">
      <style>{`
        @keyframes mozip-featured-carousel {
          from {
            transform: ${getCarouselTransform(CAROUSEL_START_OFFSET_REM)};
          }
          to {
            transform: ${getCarouselTransform(CAROUSEL_END_OFFSET_REM)};
          }
        }
      `}</style>

      <div ref={ref} className={reveal.className} style={reveal.style}>
        <div className="px-16">
          <h2 className="text-center text-heading-2">MOZIP PICK !</h2>
          <p className="mt-[0.8rem] text-center text-body-1 text-body">
            지금 주목받는 정책을 모아봤어요
          </p>
        </div>

        <div className="mt-[6rem] w-full overflow-hidden [container-type:inline-size]">
          <div
            className="flex w-max gap-[2.6rem]"
            style={{
              transform: getCarouselTransform(CAROUSEL_START_OFFSET_REM),
              animation: `mozip-featured-carousel ${CAROUSEL_DURATION_S}s linear infinite`,
              willChange: 'transform',
            }}
            aria-hidden
          >
            {CAROUSEL_TRACK.map((cardIndex, index) => {
              const card = FEATURED_CARDS[cardIndex];

              return (
                <div
                  key={`${card.id}-${index}`}
                  className="shrink-0 overflow-hidden rounded-[1.6rem] border-[1.5px] border-primary"
                  style={{ width: `${CARD_WIDTH_REM}rem` }}
                >
                  <img
                    src={card.image}
                    alt=""
                    className="h-auto w-full"
                    draggable={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContentSection;
