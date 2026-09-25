import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useApplicationGuide } from '@pages/package/hooks/useApplicationGuide';
import { usePolicyDetail } from '@pages/package/hooks/usePolicyDetail';
import { usePolicyEvaluation } from '@pages/package/hooks/usePolicyEvaluation';
import { usePolicySummary } from '@pages/package/hooks/usePolicySummary';
import EligibilityConditions from '@pages/package/components/EligibilityConditions';
import AiSummaryLoading from '@pages/package/components/AiSummaryLoading';
import PolicyShareMenu from '@pages/package/components/PolicyShareMenu';
import PolicyText from '@pages/package/components/PolicyText';
import { useTermExplanation } from '@pages/package/hooks/useTermExplanation';
import { useToggleBookmark } from '@pages/package/hooks/useToggleBookmark';
import { getAvailabilityBadge } from '@pages/package/utils/getAvailabilityBadge';
import {
  buildPolicyKakaoText,
  buildPolicyShareText,
  getPolicyShareUrl,
} from '@pages/package/utils/buildPolicyShareText';
import { getEligibilitySummary } from '@pages/package/utils/getEligibilitySummary';
import { ELIGIBILITY_STATUS_LABELS } from '@pages/package/utils/getEvaluationLabels';
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

const SkeletonBox = ({ className }: { className: string }) => (
  <div
    aria-hidden
    className={`animate-pulse rounded-[0.4rem] bg-gray-200 ${className}`}
  />
);

// 섹션 제목 자리까지 잡아 두는 스켈레톤. 실제 섹션(DetailSection)과 같은 여백·구분선을 써서 로딩이 끝나도 레이아웃이 튀지 않게 한다.
const SectionSkeleton = ({
  lines = 2,
  titleWidth = 'w-[9rem]',
}: {
  lines?: number;
  titleWidth?: string;
}) => (
  <section className="border-t border-gray-200 py-[2rem]">
    <SkeletonBox className={`h-[2rem] ${titleWidth}`} />
    <div className="mt-[1.2rem] flex flex-col gap-[0.8rem]">
      {Array.from({ length: lines }, (_, index) => (
        <SkeletonBox
          key={index}
          className={`h-[1.6rem] ${index === lines - 1 ? 'w-[60%]' : 'w-full'}`}
        />
      ))}
    </div>
  </section>
);

// 상세 전체를 불러오는 동안: 제목·상태 뱃지·AI 요약 박스·주요 섹션·하단 버튼까지 실제 모달과 같은 배치로 보여준다.
const DetailSkeleton = () => (
  <div
    className="flex min-h-0 flex-1 flex-col"
    aria-busy="true"
    aria-label="정책 정보를 불러오는 중"
  >
    <div className="min-h-0 flex-1 overflow-hidden px-[3.6rem] pt-[4rem] pb-[1.8rem]">
      <SkeletonBox className="h-[3.2rem] w-[70%] rounded-[0.8rem]" />
      <div className="flex items-center gap-[1rem] py-[2rem]">
        <SkeletonBox className="h-[2.6rem] w-[7rem] rounded-[0.8rem]" />
        <SkeletonBox className="h-[1.8rem] w-[12rem]" />
      </div>
      <div className="mb-[2rem] rounded-[0.8rem] bg-primary-sub-3 px-[1.6rem] py-[1.4rem]">
        <SkeletonBox className="h-[1.8rem] w-[8rem]" />
        <div className="mt-[1rem] flex flex-col gap-[0.8rem]">
          <SkeletonBox className="h-[1.6rem] w-full" />
          <SkeletonBox className="h-[1.6rem] w-[70%]" />
        </div>
      </div>
      <SectionSkeleton lines={2} />
      <SectionSkeleton lines={3} />
      <SectionSkeleton lines={2} />
    </div>
    <div className="shrink-0 px-[3.2rem] pt-[1.2rem] pb-[2rem]">
      <div className="flex items-center gap-[1.2rem]">
        <SkeletonBox className="size-[4.4rem] shrink-0 rounded-[0.8rem]" />
        <SkeletonBox className="h-[4.4rem] flex-1 rounded-[0.8rem]" />
        <SkeletonBox className="h-[4.4rem] flex-1 rounded-[0.8rem]" />
      </div>
    </div>
  </div>
);

// 신청 가이드(로그인 전용)를 불러오는 동안: 실제로 나올 신청 절차·준비 서류·문의처 섹션 모양대로 보여준다.
const GuideSkeleton = () => (
  <div aria-busy="true" aria-label="신청 가이드를 불러오는 중">
    <SectionSkeleton lines={3} titleWidth="w-[10rem]" />
    <SectionSkeleton lines={2} titleWidth="w-[10rem]" />
    <SectionSkeleton lines={1} titleWidth="w-[8rem]" />
  </div>
);

// 나의 신청 자격(로그인+프로필 전용)을 판정하는 동안: 판정 뱃지와 조건별 결과 줄 모양대로 보여준다.
const EvaluationSkeleton = () => (
  <section
    className="border-t border-gray-200 py-[2rem]"
    aria-busy="true"
    aria-label="나의 신청 자격을 확인하는 중"
  >
    <SkeletonBox className="h-[2rem] w-[11rem]" />
    <div className="mt-[1.2rem] flex items-center gap-[0.8rem]">
      <SkeletonBox className="h-[2.6rem] w-[6rem] rounded-[0.8rem]" />
      <SkeletonBox className="h-[1.6rem] w-[50%]" />
    </div>
    <div className="mt-[1.2rem] flex flex-col gap-[0.6rem]">
      <SkeletonBox className="h-[1.6rem] w-[80%]" />
      <SkeletonBox className="h-[1.6rem] w-[65%]" />
    </div>
  </section>
);

// 원문의 "-"처럼 글자·숫자가 없는 항목은 "없음" 표시라 목록에서 뺀다.
const hasMeaningfulText = (value: string) => /[\p{L}\p{N}]/u.test(value);

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

// 판정 뱃지 + 판정 이유. 이유가 두 줄 이상으로 줄바꿈되면 뱃지 위아래 여백을 늘려
// 문단 높이와 어울리게 하고, 뱃지는 문단 전체의 세로 가운데에 둔다.
const EligibilityVerdict = ({
  label,
  reason,
}: {
  label: string;
  reason?: string;
}) => {
  const reasonRef = useRef<HTMLSpanElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);

  useEffect(() => {
    const element = reasonRef.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
      setIsMultiline(
        Number.isFinite(lineHeight) && element.offsetHeight > lineHeight * 1.5
      );
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex items-center gap-[1.2rem]">
      <span
        className={`shrink-0 whitespace-nowrap rounded-[0.8rem] border border-gray-300 bg-gray-100 px-[1rem] font-semibold text-body-3 text-title ${
          isMultiline ? 'py-[0.8rem]' : ''
        }`}
      >
        {label}
      </span>
      {reason && (
        <span
          ref={reasonRef}
          className="min-w-0 flex-1 break-keep text-body-3 text-body"
        >
          {reason}
        </span>
      )}
    </div>
  );
};

const PolicyDetailModal = ({ policyId, onClose }: PolicyDetailModalProps) => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const { data: detail, isLoading, isError } = usePolicyDetail(policyId);
  const { data: guide, isLoading: isGuideLoading } =
    useApplicationGuide(policyId);
  const { data: aiSummary, isLoading: isAiSummaryLoading } =
    usePolicySummary(policyId);
  const { data: evaluation, isLoading: isEvaluationLoading } =
    usePolicyEvaluation(policyId);
  const { mutate: mutateBookmark } = useToggleBookmark();
  const { mutateAsync: explainTerm } = useTermExplanation(policyId);
  const startExchange = useChatPanelStore((state) => state.startExchange);
  const resolveExchange = useChatPanelStore((state) => state.resolveExchange);
  const [bookmarkOverride, setBookmarkOverride] = useState<boolean | null>(
    null
  );

  const bookmarked = bookmarkOverride ?? detail?.bookmarked ?? false;
  // 준비 서류가 비었거나 "-"뿐이면 "• -"만 덩그러니 보이므로 섹션을 숨긴다.
  const requiredDocuments = (guide?.requiredDocuments ?? []).filter(
    hasMeaningfulText
  );
  // 신청 링크(가이드, 로그인 전용)와 원문 링크를 한 줄에 버튼으로 모아 보여준다. 같은 주소면 원문 보기만 남긴다.
  const sourceUrl = detail?.sourceUrl?.trim() || undefined;
  const guideApplicationUrl = isLoggedIn
    ? guide?.applicationUrl?.trim() || undefined
    : undefined;
  const applicationUrl =
    guideApplicationUrl && guideApplicationUrl !== sourceUrl
      ? guideApplicationUrl
      : undefined;
  // 신청 가이드(로그인 전용)가 신청 방법 원문을 단계로 보여주므로, 가이드가 있거나 불러오는 중이면
  // "신청 기간" 아래의 원문 신청 방법은 숨겨 같은 내용이 두 번 나오지 않게 한다.
  const hasGuideSteps =
    isLoggedIn && (isGuideLoading || (guide?.steps?.length ?? 0) > 0);
  const badge = getAvailabilityBadge(detail?.availability ?? null);

  const handleBookmarkClick = () => {
    const next = !bookmarked;
    setBookmarkOverride(next);
    mutateBookmark(
      { policyId, bookmarked: next },
      { onError: () => setBookmarkOverride(!next) }
    );
  };

  // 선택 팝오버에서 기다리게 하지 않고, 바로 챗봇 창을 열어 질문을 띄운 뒤
  // 답변을 받는 동안 챗봇 창에 "설명하는 중"을 보여준다.
  const handleAskSubmit = ({
    selectedText,
    context,
  }: TextSelectionAskPayload) => {
    const exchangeId = startExchange(`"${selectedText}" 뜻이 뭐예요?`);

    explainTerm({ term: selectedText, context })
      .then(({ explanation }) =>
        resolveExchange(
          exchangeId,
          explanation?.trim() || '설명을 가져오지 못했어요.'
        )
      )
      .catch((error: unknown) =>
        resolveExchange(exchangeId, getTermExplanationErrorMessage(error))
      );
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

              {/* AI 요약은 생성이 느려서, 받아오는 동안 진행 안내(AiSummaryLoading)를 보여주고 받은 뒤에 내용을 보여준다.
                  요약이 비어 있거나 실패하면 섹션 자체를 숨긴다. */}
              {(isAiSummaryLoading || aiSummary?.summary?.trim()) && (
                <div
                  className={
                    isAiSummaryLoading
                      ? 'mb-[2rem]'
                      : 'mb-[2rem] rounded-[0.8rem] bg-primary-sub-3 px-[1.6rem] py-[1.4rem]'
                  }
                >
                  <p className="text-body-3 font-semibold text-title">
                    MOZIP AI 요약
                  </p>
                  <div className="mt-[0.8rem] text-body-3 text-body">
                    {isAiSummaryLoading ? (
                      <AiSummaryLoading />
                    ) : (
                      aiSummary?.summary
                    )}
                  </div>
                </div>
              )}

              <DetailSection title="정책 소개">
                <TextBlock>
                  {displayValue(detail.summary ?? detail.description)}
                </TextBlock>
              </DetailSection>

              <DetailSection title="지원 내용">
                {detail.benefitDescription?.trim() ? (
                  <PolicyText text={detail.benefitDescription} />
                ) : (
                  <TextBlock>
                    {displayValue(detail.benefitDescription)}
                  </TextBlock>
                )}
              </DetailSection>

              <DetailSection title="신청 대상">
                <BulletList
                  items={getEligibilitySummary(detail.eligibility ?? null)}
                />
                {detail.targetDescription?.trim() && (
                  <PolicyText
                    text={detail.targetDescription}
                    className="mt-[0.8rem]"
                  />
                )}
              </DetailSection>

              {isLoggedIn && isEvaluationLoading && <EvaluationSkeleton />}
              {evaluation?.eligibility?.status && (
                <DetailSection title="나의 신청 자격">
                  <EligibilityVerdict
                    label={
                      ELIGIBILITY_STATUS_LABELS[evaluation.eligibility.status]
                        .label
                    }
                    reason={evaluation.eligibility.overallReason}
                  />

                  {evaluation.eligibility.conditionResults &&
                    evaluation.eligibility.conditionResults.length > 0 && (
                      <EligibilityConditions
                        conditions={evaluation.eligibility.conditionResults}
                      />
                    )}
                </DetailSection>
              )}

              <DetailSection title="신청 기간">
                <TextBlock>
                  {formatPolicyPeriod(
                    detail.applicationStartDate ?? null,
                    detail.applicationEndDate ?? null,
                    detail.applicationType ?? 'UNKNOWN'
                  )}
                </TextBlock>
                {detail.applicationMethod?.trim() && !hasGuideSteps && (
                  <PolicyText
                    text={detail.applicationMethod}
                    className="mt-[0.8rem]"
                  />
                )}
              </DetailSection>

              {isLoggedIn && isGuideLoading ? (
                <GuideSkeleton />
              ) : isLoggedIn ? (
                guide && (
                  <>
                    {guide.steps && guide.steps.length > 0 && (
                      <DetailSection title="신청 절차">
                        {guide.steps.length === 1 ? (
                          // 단계가 하나뿐이면 번호를 붙이지 않고, 제목이 섹션 제목과 같은 "신청 절차"면 제목도 생략한다.
                          <div className="text-body-3 text-body">
                            {guide.steps[0].title &&
                              guide.steps[0].title !== '신청 절차' && (
                                <p className="font-semibold text-title">
                                  {guide.steps[0].title}
                                </p>
                              )}
                            {guide.steps[0].description && (
                              <PolicyText
                                text={guide.steps[0].description}
                                className="mt-[0.2rem]"
                              />
                            )}
                          </div>
                        ) : (
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
                                    <PolicyText
                                      text={step.description}
                                      className="mt-[0.2rem]"
                                    />
                                  )}
                                </li>
                              ))}
                          </ol>
                        )}
                      </DetailSection>
                    )}

                    {requiredDocuments.length > 0 && (
                      <DetailSection title="준비 서류">
                        <BulletList items={requiredDocuments} />
                      </DetailSection>
                    )}

                    {guide.notes && (
                      <DetailSection title="유의사항">
                        <PolicyText text={guide.notes} />
                      </DetailSection>
                    )}

                    <DetailSection title="문의처">
                      <TextBlock>{displayValue(guide.contactInfo)}</TextBlock>
                    </DetailSection>
                  </>
                )
              ) : (
                <DetailSection title="신청 서류 · 절차 · 문의처">
                  <TextBlock>
                    로그인하면 필요 서류, 신청 절차, 문의처를 확인할 수 있어요.
                  </TextBlock>
                </DetailSection>
              )}

              {(applicationUrl || sourceUrl) && (
                <div className="mt-[2rem] flex flex-wrap gap-[0.8rem]">
                  {applicationUrl && (
                    <a
                      href={applicationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-[3.6rem] items-center rounded-[0.8rem] border border-gray-300 bg-white px-[1.4rem] text-body-3 font-semibold text-title transition-colors duration-200 hover:bg-gray-100"
                    >
                      신청하러 가기
                    </a>
                  )}
                  {sourceUrl && (
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex h-[3.6rem] items-center rounded-[0.8rem] border border-gray-300 bg-white px-[1.4rem] text-body-3 font-semibold text-title transition-colors duration-200 hover:bg-gray-100"
                    >
                      원문 보기
                    </a>
                  )}
                </div>
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

                <PolicyShareMenu
                  className="flex-1"
                  getCopyText={() =>
                    buildPolicyShareText({
                      detail,
                      aiSummary: aiSummary?.summary,
                      guide: isLoggedIn ? guide : null,
                      shareUrl: getPolicyShareUrl(policyId),
                    })
                  }
                  getKakaoShare={() => ({
                    text: buildPolicyKakaoText({
                      detail,
                      aiSummary: aiSummary?.summary,
                    }),
                    url: getPolicyShareUrl(policyId),
                  })}
                />

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
