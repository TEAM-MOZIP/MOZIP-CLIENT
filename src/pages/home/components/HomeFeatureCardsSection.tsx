import { useScrollReveal } from '@pages/home/hooks/useScrollReveal';

import featurePattern1 from '@shared/assets/images/home/feature-pattern-1.svg';
import featurePattern2 from '@shared/assets/images/home/feature-pattern-2.svg';
import featurePattern3 from '@shared/assets/images/home/feature-pattern-3.svg';
import featurePattern4 from '@shared/assets/images/home/feature-pattern-4.svg';
import featurePattern5 from '@shared/assets/images/home/feature-pattern-5.svg';
import featurePattern6 from '@shared/assets/images/home/feature-pattern-6.svg';

const FEATURE_ITEMS = [
  {
    pattern: featurePattern1,
    theme: 'yellow',
    title: '맞춤 정책 추천',
    description:
      '나이, 성별, 지역, 상황을 분석해 나에게 딱 맞는 정책을 AI 큐레이션을 통해 보여드려요.',
  },
  {
    pattern: featurePattern2,
    theme: 'dark',
    title: '정책 패키지 추천',
    description:
      '취준생, 자취생, 노년층 등 상황별로 묶어 \n 정책 모음을 한 번에 추천해드려요.',
  },
  {
    pattern: featurePattern3,
    theme: 'yellow',
    title: '캘린더',
    description:
      '정책을 북마크하면 신청·마감일이 자동으로 내 캘린더에 등록돼요.',
  },
  {
    pattern: featurePattern4,
    theme: 'dark',
    title: '리마인드 알림',
    description:
      '신청일, 마감일이 다가오면 웹 내부 알림과 이메일로 리마인드 알림을 보내드려요.',
  },
  {
    pattern: featurePattern5,
    theme: 'yellow',
    title: 'AI 챗봇 가이드',
    description:
      '어려운 행정 언어를 쉽게 풀어 설명하고, 신청 절차를 단계별로 안내해요.',
  },
  {
    pattern: featurePattern6,
    theme: 'dark',
    title: '내보내기 / 공유',
    description:
      '정책 핵심 요약을 카카오톡으로 공유하거나 보호자에게 그대로 전송할 수 있어요.',
  },
] as const;

const THEME_STYLES = {
  yellow: {
    card: 'bg-primary-sub-1',
    title: 'text-gray-800',
    description: 'text-gray-600',
  },
  dark: {
    card: 'bg-gray-700',
    title: 'text-white',
    description: 'text-gray-400',
  },
} as const;

const HomeFeatureCardsSection = () => {
  const { ref, getContainerProps } = useScrollReveal();
  const reveal = getContainerProps();

  return (
    <section className="flex min-h-[calc(100dvh-8.1rem)] w-full items-center bg-primary-sub-2/35 py-[6rem]">
      <div className="mx-auto w-full px-16">
        <div ref={ref} className={reveal.className} style={reveal.style}>
          <h2 className="text-center text-heading-2">
            MOZIP의 다양한 기능을 만나보세요
          </h2>

          <div className="mx-auto mt-[6rem] grid w-full max-w-[120rem] grid-cols-3 gap-[4rem_3.2rem]">
            {FEATURE_ITEMS.map((item) => {
              const styles = THEME_STYLES[item.theme];

              return (
                <article
                  key={item.title}
                  className={`flex flex-col overflow-hidden rounded-[2.4rem] ${styles.card}`}
                >
                  <img
                    src={item.pattern}
                    alt=""
                    aria-hidden
                    className="mt-[1.6rem] h-[14rem] w-full shrink-0 object-contain object-left"
                    draggable={false}
                  />
                  <div className="px-[3.2rem] pt-[0.8rem] pb-[3.2rem]">
                    <h3 className={`text-heading-3 font-bold ${styles.title}`}>
                      {item.title}
                    </h3>
                    <p
                      className={`mt-[0.8rem] text-body-3 ${styles.description}`}
                    >
                      {item.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatureCardsSection;
