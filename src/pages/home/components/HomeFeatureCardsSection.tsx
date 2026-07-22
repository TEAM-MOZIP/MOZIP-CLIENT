import { useScrollReveal } from '@pages/home/hooks/useScrollReveal';

import feature1 from '@shared/assets/images/home/feature-1.png';
import feature2 from '@shared/assets/images/home/feature-2.png';
import feature3 from '@shared/assets/images/home/feature-3.png';
import feature4 from '@shared/assets/images/home/feature-4.png';
import feature5 from '@shared/assets/images/home/feature-5.png';
import feature6 from '@shared/assets/images/home/feature-6.png';

const FEATURE_ITEMS = [
  {
    image: feature1,
    title: '맞춤 정책 추천',
    description:
      '나이, 성별, 지역, 상황을 분석해 나에게 딱 맞는 정책을 AI가 큐레이션합니다.',
  },
  {
    image: feature2,
    title: '정책 패키지 추천',
    description:
      '취준생, 자취생, 노년층 등 상황별로 묶어 정책 모음을 한 번에 추천합니다.',
  },
  {
    image: feature3,
    title: '캘린더',
    description:
      '정책을 북마크하면 신청·마감일이 자동으로 내 캘린더에 등록됩니다.',
  },
  {
    image: feature4,
    title: '리마인드 알림',
    description:
      '신청일, 마감일이 다가오면 웹 내부 알림과 이메일로 리마인드 알림을 보내드립니다.',
  },
  {
    image: feature5,
    title: 'AI 챗봇 가이드',
    description:
      '어려운 행정 언어를 쉽게 풀어 설명하고, 신청 절차를 단계별로 안내합니다.',
  },
  {
    image: feature6,
    title: '내보내기 / 공유',
    description:
      '정책 핵심 요약을 PDF, TXT로 내보내거나 보호자에게 링크를 바로 공유합니다.',
  },
] as const;

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
            {FEATURE_ITEMS.map((item) => (
              <article
                key={item.title}
                className="rounded-[1.6rem] border-[1.5px] border-primary bg-white p-[3.2rem]"
              >
                <img
                  src={item.image}
                  alt=""
                  aria-hidden
                  className="h-[4rem] w-[4rem] object-contain"
                  draggable={false}
                />
                <h3 className="mt-[1.6rem] text-heading-3 text-title">
                  {item.title}
                </h3>
                <p className="mt-[0.8rem] text-body-3 text-body">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeFeatureCardsSection;
