import { useScrollReveal } from '@pages/home/hooks/useScrollReveal';

const HomeSubscriptionSection = () => {
  const { ref, getContainerProps } = useScrollReveal();
  const reveal = getContainerProps();

  return (
    <section className="relative flex min-h-[calc(100dvh-8.1rem)] w-full items-center justify-center overflow-hidden bg-background-default px-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 50% at 50% 50%, #FFFABC 0%, #FFF 100%)',
        }}
      />

      <div
        ref={ref}
        className={`w-full ${reveal.className}`}
        style={reveal.style}
      >
        <div className="relative mx-auto flex w-full max-w-[56rem] flex-col items-center">
          <h2 className="text-center text-heading-2">
            놓치기 쉬운 정책, 대신 챙겨드릴게요
          </h2>
          <p className="mt-[0.8rem] text-center text-body-1 text-body">
            이메일을 입력하고 소식을 받아보세요
          </p>

          <form
            className="mt-[6rem] flex w-full items-center gap-[1.2rem]"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              id="home-subscription-email"
              type="email"
              aria-label="이메일"
              inputMode="email"
              autoComplete="email"
              placeholder="이메일을 입력해주세요"
              className="h-[5.2rem] flex-1 rounded-[0.8rem] border border-gray-200 bg-white/90 px-[1.8rem] text-body-1 text-title shadow-[3px_3px_20px_rgba(0,0,0,0.15)] outline-none placeholder:text-body-2 placeholder:text-label-assistive focus:border-gray-400"
            />
            <button
              type="submit"
              className="h-[5.2rem] shrink-0 rounded-[0.8rem] bg-gray-900 px-[2.2rem] text-body-1 font-semibold text-white shadow-[3px_3px_20px_rgba(0,0,0,0.15)]"
            >
              구독
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HomeSubscriptionSection;
