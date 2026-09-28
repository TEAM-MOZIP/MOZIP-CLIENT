import OnboardingSidebarLayout from '@pages/onboarding/components/OnboardingSidebarLayout';
import type { QuestionStep } from '@pages/onboarding/types/onboarding';
import type { SummaryTone } from '@pages/onboarding/utils/getAnswerSummary';
import onboardingHero from '@shared/assets/images/onboarding/onboarding-hero.png';

type OnboardingCompleteProps = {
  nickname?: string | null;
  summary: { label: string; tone: SummaryTone }[];
  stepAnswers: Partial<Record<QuestionStep, string | null>>;
  onGoPolicies: () => void;
  onGoHome: () => void;
};

const TONE_CLASS: Record<SummaryTone, string> = {
  lavender: 'border-[#C9B8FF] bg-[#EEE8FF]',
  blue: 'border-[#97C4FF] bg-[#D7EAFF]',
  yellow: 'border-primary bg-primary-sub-2',
  green: 'border-[#8CE29C] bg-[#DDFAD4]',
};

const OnboardingComplete = ({
  nickname,
  summary,
  stepAnswers,
  onGoPolicies,
  onGoHome,
}: OnboardingCompleteProps) => {
  return (
    <OnboardingSidebarLayout currentStep="done" stepAnswers={stepAnswers}>
      <div className="flex max-w-[72rem] flex-col items-center rounded-[2rem] bg-white px-[2rem] pt-[4rem] pb-[3.2rem] text-center shadow-[0_0.2rem_1.6rem_rgba(0,0,0,0.06)]">
        <img
          src={onboardingHero}
          alt=""
          aria-hidden
          draggable={false}
          className="h-auto w-[16rem]"
        />
        <h1 className="mt-[2rem] text-[2.6rem] leading-[1.4] font-bold tracking-[-0.04em] text-gray-800">
          {nickname ? `${nickname}님을 위한` : '나를 위한'}
          <br />
          맞춤 추천을 준비했어요
        </h1>
        <p className="mt-[0.8rem] text-body-3 text-gray-500">
          조건은 마이페이지에서 언제든 바꿀 수 있어요.
        </p>

        {summary.length > 0 && (
          <ul className="mt-[2.2rem] flex flex-wrap justify-center gap-[0.6rem]">
            {summary.map((item) => (
              <li
                key={item.label}
                className={`rounded-full border px-[1.2rem] py-[0.4rem] text-caption font-semibold text-gray-800 ${TONE_CLASS[item.tone]}`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        )}

        <button
          type="button"
          onClick={onGoPolicies}
          className="mt-[3.2rem] h-[5.2rem] min-w-[24rem] cursor-pointer rounded-[1.2rem] bg-gray-800 px-[2.4rem] text-button-2 text-white transition-colors hover:bg-gray-700"
        >
          추천 정책 보러가기
        </button>
        <button
          type="button"
          onClick={onGoHome}
          className="mt-[1.4rem] cursor-pointer text-caption text-gray-400 underline underline-offset-[0.3rem] transition-colors hover:text-gray-500"
        >
          홈으로
        </button>
      </div>
    </OnboardingSidebarLayout>
  );
};

export default OnboardingComplete;
