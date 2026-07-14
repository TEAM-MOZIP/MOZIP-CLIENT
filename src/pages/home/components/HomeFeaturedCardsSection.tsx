import { useScrollReveal } from '@pages/home/hooks/useScrollReveal';

/** 시안 기준 14rem × (16·20·24·20·16rem) — 5장 고정 */
const FEATURED_CARDS = [
  { id: 'featured-0', aspectRatio: '14 / 16' },
  { id: 'featured-1', aspectRatio: '14 / 18' },
  { id: 'featured-2', aspectRatio: '14 / 20' },
  { id: 'featured-3', aspectRatio: '14 / 18' },
  { id: 'featured-4', aspectRatio: '14 / 16' },
] as const;

const HomeFeaturedCardsSection = () => {
  const { ref, getContainerProps } = useScrollReveal();
  const reveal = getContainerProps();

  return (
    <section className="w-full px-16 pb-[6rem] pt-[8rem]">
      <div
        ref={ref}
        className={`grid w-full grid-cols-5 items-end gap-[2rem] ${reveal.className}`}
        style={reveal.style}
      >
        {FEATURED_CARDS.map((card) => (
          <div
            key={card.id}
            className="w-full rounded-[1.2rem] bg-gray-200/80"
            style={{ aspectRatio: card.aspectRatio }}
            aria-hidden
          />
        ))}
      </div>
    </section>
  );
};

export default HomeFeaturedCardsSection;
