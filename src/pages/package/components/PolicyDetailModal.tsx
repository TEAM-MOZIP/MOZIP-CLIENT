import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useApplicationGuide } from '@pages/package/hooks/useApplicationGuide';
import { usePolicyDetail } from '@pages/package/hooks/usePolicyDetail';
import { usePolicyEvaluation } from '@pages/package/hooks/usePolicyEvaluation';
import { usePolicySummary } from '@pages/package/hooks/usePolicySummary';
import { useTermExplanation } from '@pages/package/hooks/useTermExplanation';
import { useToggleBookmark } from '@pages/package/hooks/useToggleBookmark';
import { getAvailabilityBadge } from '@pages/package/utils/getAvailabilityBadge';
import { getEligibilitySummary } from '@pages/package/utils/getEligibilitySummary';
import {
  ELIGIBILITY_STATUS_LABELS,
  getConditionStatusLabel,
  getConditionTypeLabel,
} from '@pages/package/utils/getEvaluationLabels';
import { formatPolicyPeriod } from '@pages/package/utils/getPolicyPeriod';
import { getTermExplanationErrorMessage } from '@pages/package/utils/getTermExplanationErrorMessage';
import TextSelection, {
  type TextSelectionAskPayload,
} from '@shared/components/text-selection/TextSelection';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';
import { useChatPanelStore } from '@shared/stores/useChatPanelStore';
import bookmarkIcon from '@shared/assets/icons/bookmark.svg';
import bookmarkFilledIcon from '@shared/assets/icons/bookmark-filled.svg';
import { displayValue, EMPTY_VALUE } from '@shared/utils/displayValue';

type PolicyDetailModalProps = {
  policyId: number;
  onClose: () => void;
  onShareClick?: () => void;
};

const DetailSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="border-t border-gray-200 py-[2rem]">
    <h3 className="text-body-2 font-bold text-title">{title}</h3>
    <div className="mt-[1.2rem]">{children}</div>
  </section>
);

const SkeletonLines = ({
  lines = 2,
  label,
}: {
  lines?: number;
  label: string;
}) => (
  <div
    className="flex flex-col gap-[0.8rem]"
    aria-busy="true"
    aria-label={label}
  >
    {Array.from({ length: lines }, (_, index) => (
      <div
        key={index}
        className={[
          'h-[1.6rem] animate-pulse rounded-[0.4rem] bg-gray-200',
          index === lines - 1 ? 'w-[60%]' : 'w-full',
        ].join(' ')}
      />
    ))}
  </div>
);

const DetailSkeleton = () => (
  <div className="flex flex-col gap-[2.4rem] px-[3.6rem] py-[4rem]">
    <div className="h-[3.2rem] w-[70%] animate-pulse rounded-[0.8rem] bg-gray-200" />
    <div className="h-[2.4rem] w-[40%] animate-pulse rounded-[0.8rem] bg-gray-200" />
    <SkeletonLines lines={3} label="정책 정보를 불러오는 중" />
    <SkeletonLines lines={3} label="정책 정보를 불러오는 중" />
  </div>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-[0.6rem]">
    {(items.length > 0 ? items : [EMPTY_VALUE]).map((item) => (
      <li key={item} className="text-body-3 text-body">
        • {item}
      </li>
    ))}
  </ul>
);

const TextBlock = ({ children }: { children: ReactNode }) => (
  <p className="text-body-3 text-body whitespace-pre-line">{children}</p>
);

const PolicyDetailModal = ({
  policyId,
  onClose,
  onShareClick,
}: PolicyDetailModalProps) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const { data: detail, isLoading, isError } = usePolicyDetail(policyId);
  const { data: guide, isLoading: isGuideLoading } =
    useApplicationGuide(policyId);
  const { data: aiSummary, isLoading: isAiSummaryLoading } =
    usePolicySummary(policyId);
  const { data: evaluation } = usePolicyEvaluation(policyId);
  const { mutate: mutateBookmark } = useToggleBookmark();
  const { mutateAsync: explainTerm } = useTermExplanation(policyId);
  const showExchange = useChatPanelStore((state) => state.showExchange);
  const [bookmarkOverride, setBookmarkOverride] = useState<boolean | null>(
    null
  );

  const bookmarked = bookmarkOverride ?? detail?.bookmarked ?? false;
  const badge = getAvailabilityBadge(detail?.availability ?? null);

  const handleBookmarkClick = () => {
    const next = !bookmarked;
    setBookmarkOverride(next);
    mutateBookmark(
      { policyId, bookmarked: next },
      { onError: () => setBookmarkOverride(!next) }
    );
  };

  const handleAskSubmit = async ({
    selectedText,
    context,
  }: TextSelectionAskPayload) => {
    const question = `"${selectedText}" 뜻이 뭐예요?`;

    try {
      const { explanation } = await explainTerm({
        term: selectedText,
        context,
      });
      showExchange({
        question,
        answer: explanation?.trim() || '설명을 가져오지 못했어요.',
      });
    } catch (error) {
      showExchange({
        question,
        answer: getTermExplanationErrorMessage(error),
      });
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (useChatPanelStore.getState().isOpen) return;
      onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      data-chat-coexist="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-[2rem]"
      onClick={(event) => {
        const target = event.target as Element | null;
        if (target?.closest('[data-chat-floating="true"]')) return;
        onClose();
      }}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-detail-title"
        className="flex max-h-[85vh] w-full max-w-[68rem] flex-col overflow-hidden rounded-[1.2rem] border border-gray-300 bg-white shadow-[0_0.8rem_2.4rem_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <DetailSkeleton />
        ) : isError || !detail ? (
          <p className="px-[3.6rem] py-[6rem] text-center text-body-2 text-gray-500">
            정책 정보를 불러오지 못했어요.
          </p>
        ) : (
          <>
            <TextSelection
              className="min-h-0 flex-1 overflow-y-auto px-[3.6rem] pt-[4rem] pb-[1.8rem]"
              onAskSubmit={handleAskSubmit}
            >
              <h3
                id="policy-detail-title"
                className="text-heading-3 font-bold text-title"
              >
                {detail.title}
              </h3>

              <div className="flex flex-wrap items-center gap-[1rem] py-[2rem]">
                {badge && (
                  <span className="shrink-0 whitespace-nowrap rounded-[0.8rem] border border-gray-300 bg-gray-100 px-[1rem] py-[0.2rem] font-semibold text-body-3 text-title">
                    {badge.label}
                  </span>
                )}
                <span className="text-body-3 text-gray-500">
                  {displayValue(detail.organizationName)}
                </span>
              </div>

              {/* AI 요약은 생성이 느려서, 받아오는 동안 스켈레톤을 보여주고 받은 뒤에 내용을 보여준다.
                  요약이 비어 있거나 실패하면 섹션 자체를 숨긴다. */}
              {(isAiSummaryLoading || aiSummary?.summary?.trim()) && (
                <div className="mb-[2rem] rounded-[0.8rem] bg-primary-sub-3 px-[1.6rem] py-[1.4rem]">
                  <p className="text-body-3 font-semibold text-title">
                    🤖 AI 요약
                  </p>
                  <div className="mt-[0.8rem] text-body-3 text-body">
                    {isAiSummaryLoading ? (
                      <SkeletonLines label="AI 요약을 불러오는 중" />
                    ) : (
                      aiSummary?.summary
                    )}
                  </div>
                </div>
              )}

              <DetailSection title="📌 정책 소개">
                <TextBlock>
                  {displayValue(detail.summary ?? detail.description)}
                </TextBlock>
              </DetailSection>

              <DetailSection title="💰 지원 내용">
                <TextBlock>{displayValue(detail.benefitDescription)}</TextBlock>
              </DetailSection>

              <DetailSection title="👤 신청 대상">
                <BulletList
                  items={getEligibilitySummary(detail.eligibility ?? null)}
                />
                {detail.targetDescription && (
                  <p className="mt-[0.8rem] text-body-3 text-body">
                    {detail.targetDescription}
                  </p>
                )}
              </DetailSection>

              {evaluation?.eligibility?.status && (
                <DetailSection title="🎯 나의 신청 자격">
                  <div className="flex items-center gap-[0.8rem]">
                    <span className="shrink-0 whitespace-nowrap rounded-[0.8rem] border border-gray-300 bg-gray-100 px-[1rem] py-[0.2rem] font-semibold text-body-3 text-title">
                      {
                        ELIGIBILITY_STATUS_LABELS[evaluation.eligibility.status]
                          .label
                      }
                    </span>
                    {evaluation.eligibility.overallReason && (
                      <span className="text-body-3 text-body">
                        {evaluation.eligibility.overallReason}
                      </span>
                    )}
                  </div>

                  {evaluation.eligibility.conditionResults &&
                    evaluation.eligibility.conditionResults.length > 0 && (
                      <ul className="mt-[1.2rem] flex flex-col gap-[0.6rem]">
                        {evaluation.eligibility.conditionResults.map(
                          (condition, index) => (
                            <li
                              key={`${condition.type}-${index}`}
                              className="text-body-3 text-body"
                            >
                              <span className="font-semibold text-title">
                                {getConditionTypeLabel(condition.type)} ·{' '}
                                {getConditionStatusLabel(condition.status)}
                              </span>
                              {condition.reason && (
                                <span> — {condition.reason}</span>
                              )}
                            </li>
                          )
                        )}
                      </ul>
                    )}
                </DetailSection>
              )}

              <DetailSection title="📅 신청 기간">
                <TextBlock>
                  {formatPolicyPeriod(
                    detail.applicationStartDate ?? null,
                    detail.applicationEndDate ?? null,
                    detail.applicationType ?? 'UNKNOWN'
                  )}
                </TextBlock>
                {detail.applicationMethod && (
                  <p className="mt-[0.8rem] text-body-3 text-body">
                    {detail.applicationMethod}
                  </p>
                )}
              </DetailSection>

              {isLoggedIn && isGuideLoading ? (
                <DetailSection title="📝 신청 절차 · 준비 서류">
                  <SkeletonLines lines={3} label="신청 가이드를 불러오는 중" />
                </DetailSection>
              ) : isLoggedIn ? (
                guide && (
                  <>
                    {guide.steps && guide.steps.length > 0 && (
                      <DetailSection title="📝 신청 절차">
                        <ol className="flex flex-col gap-[0.8rem]">
                          {[...guide.steps]
                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                            .map((step) => (
                              <li
                                key={`${step.order}-${step.title}`}
                                className="text-body-3 text-body"
                              >
                                <span className="font-semibold text-title">
                                  {step.order}. {step.title}
                                </span>
                                {step.description && (
                                  <p className="mt-[0.2rem]">
                                    {step.description}
                                  </p>
                                )}
                              </li>
                            ))}
                        </ol>
                      </DetailSection>
                    )}

                    <DetailSection title="📋 준비 서류">
                      <BulletList items={guide.requiredDocuments ?? []} />
                    </DetailSection>

                    {guide.notes && (
                      <DetailSection title="⚠️ 유의사항">
                        <TextBlock>{guide.notes}</TextBlock>
                      </DetailSection>
                    )}

                    <DetailSection title="📞 문의처">
                      <TextBlock>{displayValue(guide.contactInfo)}</TextBlock>
                    </DetailSection>

                    {guide.applicationUrl && (
                      <a
                        href={guide.applicationUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-[0.8rem] inline-block text-body-3 font-semibold text-blue underline"
                      >
                        신청하러 가기
                      </a>
                    )}
                  </>
                )
              ) : (
                <DetailSection title="신청 서류 · 절차 · 문의처">
                  <TextBlock>
                    로그인하면 필요 서류, 신청 절차, 문의처를 확인할 수 있어요.
                  </TextBlock>
                </DetailSection>
              )}

              {detail.sourceUrl && (
                <a
                  href={detail.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-[2rem] inline-block text-body-3 text-gray-500 underline"
                >
                  원문 보기
                </a>
              )}
            </TextSelection>

            <div className="relative shrink-0 bg-white px-[3.2rem] pt-[1.2rem] pb-[2rem]">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-full h-[4rem] bg-gradient-to-b from-transparent to-white"
              />
              <div className="flex items-center gap-[1.2rem]">
                <button
                  type="button"
                  aria-label={bookmarked ? '북마크 해제' : '북마크'}
                  aria-pressed={bookmarked}
                  onClick={handleBookmarkClick}
                  className="flex size-[4.4rem] shrink-0 cursor-pointer items-center justify-center rounded-[0.8rem] border border-gray-300 bg-white"
                >
                  <img
                    src={bookmarked ? bookmarkFilledIcon : bookmarkIcon}
                    alt=""
                    aria-hidden
                    className="size-[2.4rem]"
                  />
                </button>

                <button
                  type="button"
                  onClick={onShareClick}
                  className="flex h-[4.4rem] flex-1 cursor-pointer items-center justify-center rounded-[0.8rem] border border-gray-300 bg-white text-button-2 text-title transition-colors duration-200 hover:bg-gray-100"
                >
                  공유
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-[4.4rem] flex-1 cursor-pointer items-center justify-center rounded-[0.8rem] border border-gray-300 bg-white text-button-2 text-title transition-colors duration-200 hover:bg-gray-100"
                >
                  닫기
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default PolicyDetailModal;
