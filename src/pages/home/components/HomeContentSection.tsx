import { useScrollReveal } from '@pages/home/hooks/useScrollReveal';

const GRID_CARD_COUNT = 6;

const HomeContentSection = () => {
  const { ref, getContainerProps } = useScrollReveal();
  const reveal = getContainerProps();

  return (
    <section className="w-full bg-background-default py-[4rem]">
      <div className="mx-auto w-full px-16">
        <div ref={ref} className={reveal.className} style={reveal.style}>
          <div
            className="h-[12rem] w-full rounded-[1.2rem] bg-gray-200"
            aria-hidden
          />

          <div
            className="mx-auto mt-[3.2rem] h-[2.4rem] w-[32rem] max-w-full rounded-[0.8rem] bg-gray-200"
            aria-hidden
          />

          <div className="mx-auto mt-[3.2rem] grid w-full max-w-[112rem] grid-cols-3 gap-[2.4rem]">
            {Array.from({ length: GRID_CARD_COUNT }).map((_, index) => (
              <div
                key={index}
                className="aspect-square w-full rounded-[1.2rem] bg-gray-200"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContentSection;
