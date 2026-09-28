import type { ReactNode } from 'react';
import {
  QUESTION_STEPS,
  STEP_NAMES,
} from '@pages/onboarding/constants/onboarding';
import type { QuestionStep } from '@pages/onboarding/types/onboarding';

type OnboardingSidebarLayoutProps = {
  /** 지금 단계. 시작 화면이면 null, 완료 화면이면 'done' */
  currentStep: QuestionStep | null | 'done';
  /** 단계별로 고른 답(사이드바에 작게 표시) */
  stepAnswers?: Partial<Record<QuestionStep, string | null>>;
  /** 한 번 지나온 단계까지만 눌러서 돌아갈 수 있다 */
  maxVisitedStep?: number;
  onStepClick?: (step: QuestionStep) => void;
  children: ReactNode;
};

type StepState = 'done' | 'now' | 'todo';

const DOT_CLASS: Record<StepState, string> = {
  done: 'bg-gray-700',
  now: 'bg-primary shadow-[0_0_0_0.3rem_var(--color-primary-sub-2)]',
  todo: 'bg-gray-200',
};

const NAME_CLASS: Record<StepState, string> = {
  done: 'text-gray-700',
  now: 'font-bold text-gray-800',
  todo: 'text-gray-500',
};

/** 온보딩 공통 화면: 왼쪽 단계 목록(정책 목록 필터 사이드바 톤) + 오른쪽 내용 */
const OnboardingSidebarLayout = ({
  currentStep,
  stepAnswers = {},
  maxVisitedStep = 0,
  onStepClick,
  children,
}: OnboardingSidebarLayoutProps) => {
  const getState = (step: QuestionStep): StepState => {
    if (currentStep === 'done') return 'done';
    if (currentStep === null) return 'todo';
    if (step < currentStep) return 'done';
    return step === currentStep ? 'now' : 'todo';
  };

  return (
    <section className="mx-auto grid min-h-[calc(100dvh-8.1rem)] w-full max-w-[120rem] gap-[4.8rem] px-[2rem] pt-[4rem] pb-[6.4rem] lg:grid-cols-[28rem_1fr] lg:px-[3.2rem]">
      <aside className="hidden lg:block">
        <h2 className="text-[2.2rem] leading-[1.4] font-bold tracking-[-0.04em] text-gray-800">
          내 조건 입력
        </h2>
        <p className="mt-[0.6rem] text-caption text-gray-500">
          입력할수록 추천이 정확해져요.
        </p>

        <ol className="mt-[2.4rem] border-l border-gray-200">
          {QUESTION_STEPS.map((step) => {
            const state = getState(step);
            const answer = state === 'done' ? stepAnswers[step] : null;
            const clickable =
              Boolean(onStepClick) &&
              currentStep !== 'done' &&
              step <= maxVisitedStep &&
              step !== currentStep;

            return (
              <li key={step} className="relative">
                <span
                  aria-hidden
                  className={`absolute top-[1.6rem] left-[-0.5rem] size-[0.9rem] rounded-full ${DOT_CLASS[state]}`}
                />
                <button
                  type="button"
                  disabled={!clickable}
                  aria-current={state === 'now' ? 'step' : undefined}
                  onClick={() => onStepClick?.(step)}
                  className="block w-full py-[1rem] pl-[2.2rem] text-left enabled:cursor-pointer enabled:hover:opacity-70 disabled:cursor-default"
                >
                  <span className={`block text-body-3 ${NAME_CLASS[state]}`}>
                    {step}. {STEP_NAMES[step]}
                  </span>
                  {answer && (
                    <span className="mt-[0.2rem] block truncate text-caption text-gray-500">
                      {answer}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      <div className="min-w-0 lg:border-l lg:border-gray-200 lg:pl-[4.8rem]">
        {children}
      </div>
    </section>
  );
};

export default OnboardingSidebarLayout;
