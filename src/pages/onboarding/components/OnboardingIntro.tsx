import OnboardingSidebarLayout from '@pages/onboarding/components/OnboardingSidebarLayout';
import onboardingHero from '@shared/assets/images/onboarding/onboarding-hero.png';
import educationIcon from '@shared/assets/images/onboarding/education.png';
import financeIcon from '@shared/assets/images/onboarding/finance.png';
import healthcareIcon from '@shared/assets/images/onboarding/healthcare.png';

type OnboardingIntroProps = {
  onStart: () => void;
  onLater: () => void;
};

const INTRO_META = [
  { label: '질문 8개', className: 'border-[#8CE29C] bg-[#DDFAD4]' },
  { label: '약 1분', className: 'border-[#97C4FF] bg-[#D7EAFF]' },
  { label: '언제든 수정 가능', className: 'border-[#C9B8FF] bg-[#EEE8FF]' },
];

const INTRO_FEATURES = [
  {
    icon: financeIcon,
    title: '받을 수 있는 정책만',
    description: '자격 충족 여부를 표시해요',
  },
  {
    icon: healthcareIcon,
    title: '마감 전에 알림',
    description: '북마크한 정책 D-3',
  },
  {
    icon: educationIcon,
    title: '쉬운 말로 요약',
    description: 'AI가 정책을 풀어드려요',
  },
];

const OnboardingIntro = ({ onStart, onLater }: OnboardingIntroProps) => {
  return (
    <OnboardingSidebarLayout currentStep={null}>
      <div className="grid max-w-[76rem] items-center gap-[2.4rem] lg:grid-cols-[1fr_30rem]">
        <div>
          <p className="text-caption font-semibold text-gray-500">
            MOZIP 시작하기
          </p>
          <h1 className="mt-[0.8rem] text-[3rem] leading-[1.4] font-bold tracking-[-0.05em] text-gray-800">
            내 조건을 입력하면
            <br />
            <em className="not-italic shadow-[inset_0_-1.2rem_0_var(--color-primary-sub-2)]">
              딱 맞는 정책
            </em>
            을 찾아드려요.
          </h1>
          <p className="mt-[1.2rem] text-body-3 text-gray-500">
            입력한 정보는 맞춤 추천과 신청 자격 확인에만 쓰여요.
          </p>

          <ul className="mt-[1.8rem] flex flex-wrap gap-[0.6rem]">
            {INTRO_META.map((meta) => (
              <li
                key={meta.label}
                className={`rounded-full border px-[1.2rem] py-[0.4rem] text-caption font-semibold text-gray-700 ${meta.className}`}
              >
                {meta.label}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={onboardingHero}
          alt="MOZIP"
          draggable={false}
          className="order-first mx-auto h-auto w-full max-w-[22rem] lg:order-none lg:max-w-[30rem]"
        />
      </div>

      <ul className="mt-[4rem] grid max-w-[76rem] gap-[1.2rem] md:grid-cols-3">
        {INTRO_FEATURES.map((feature) => (
          <li
            key={feature.title}
            className="flex items-center gap-[1.2rem] rounded-[1.6rem] border border-gray-200 bg-white px-[1.6rem] py-[1.4rem]"
          >
            <img
              src={feature.icon}
              alt=""
              aria-hidden
              draggable={false}
              className="size-[4rem] shrink-0 object-contain"
            />
            <span>
              <span className="block text-body-3 font-semibold text-gray-800">
                {feature.title}
              </span>
              <span className="mt-[0.2rem] block text-caption text-gray-500">
                {feature.description}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-[2.8rem] max-w-[76rem]">
        <button
          type="button"
          onClick={onStart}
          className="h-[5.6rem] w-full cursor-pointer rounded-[0.8rem] bg-primary-sub-1 text-button-1 text-gray-800 transition-all hover:brightness-98"
        >
          시작하기
        </button>
        <div className="mt-[1.2rem] text-center">
          <button
            type="button"
            onClick={onLater}
            className="cursor-pointer text-caption text-gray-400 underline underline-offset-[0.3rem] transition-colors hover:text-gray-500"
          >
            나중에 할게요.
          </button>
        </div>
      </div>
    </OnboardingSidebarLayout>
  );
};

export default OnboardingIntro;
