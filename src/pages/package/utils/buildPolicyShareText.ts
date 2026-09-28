import type {
  ApplicationGuideResponse,
  PolicyDetailResponse,
} from '@pages/package/types/package';
import { getAvailabilityBadge } from '@pages/package/utils/getAvailabilityBadge';
import { getEligibilitySummary } from '@pages/package/utils/getEligibilitySummary';
import { formatPolicyPeriod } from '@pages/package/utils/getPolicyPeriod';
import { KAKAO_TEXT_MAX_LENGTH } from '@shared/utils/kakaoShare';

type PolicyShareSource = {
  detail: PolicyDetailResponse;
  aiSummary?: string | null;
  guide?: ApplicationGuideResponse | null;
  shareUrl: string;
};

// 글자·숫자가 없는 "-" 같은 값은 빈 값으로 본다.
const hasMeaningfulText = (value?: string | null): value is string =>
  Boolean(value && /[\p{L}\p{N}]/u.test(value));

// 원문 줄바꿈은 살리되, 줄 끝 공백과 3줄 이상 빈 줄은 정리한다.
const tidy = (value: string) =>
  value
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

const section = (title: string, body: string | null | undefined) =>
  hasMeaningfulText(body) ? `■ ${title}\n${tidy(body)}` : null;

const bullets = (items: string[]) =>
  items
    .filter(hasMeaningfulText)
    .map((item) => `- ${item.trim()}`)
    .join('\n');

export const getPolicyShareUrl = (policyId: number) =>
  `${window.location.origin}/package?policyId=${policyId}`;

const periodOf = (detail: PolicyDetailResponse) =>
  formatPolicyPeriod(
    detail.applicationStartDate ?? null,
    detail.applicationEndDate ?? null,
    detail.applicationType ?? 'UNKNOWN'
  );

/**
 * "텍스트 복사"용 전체 정리본. 받는 사람이 메신저에서 그대로 읽을 수 있게 섹션 제목(■)과 목록(-)만 쓴다.
 * 공유받는 사람과 무관한 "나의 신청 자격"(내 프로필 기반 판정)은 넣지 않는다.
 */
export const buildPolicyShareText = ({
  detail,
  aiSummary,
  guide,
  shareUrl,
}: PolicyShareSource): string => {
  const badge = getAvailabilityBadge(detail.availability ?? null);
  const meta = [detail.organizationName?.trim(), badge?.label]
    .filter(Boolean)
    .join(' · ');

  const steps = [...(guide?.steps ?? [])]
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .filter(
      (step) =>
        hasMeaningfulText(step.title) || hasMeaningfulText(step.description)
    )
    .map((step, index) => {
      const head = `${index + 1}. ${step.title?.trim() ?? ''}`.trimEnd();
      return hasMeaningfulText(step.description)
        ? `${head}\n   ${tidy(step.description).replace(/\n/g, '\n   ')}`
        : head;
    })
    .join('\n');

  const sourceUrl = detail.sourceUrl?.trim();
  const applicationUrl = guide?.applicationUrl?.trim();
  const links = [
    applicationUrl && applicationUrl !== sourceUrl
      ? `신청하기: ${applicationUrl}`
      : null,
    sourceUrl ? `원문 보기: ${sourceUrl}` : null,
    `MOZIP에서 보기: ${shareUrl}`,
  ]
    .filter(Boolean)
    .join('\n');

  // 가이드에 절차가 없을 때만 원문 신청 방법을 넣는다(모달과 같은 규칙).
  const applicationMethod = steps ? null : detail.applicationMethod;

  return [
    [`[MOZIP] ${detail.title?.trim() ?? ''}`, meta].filter(Boolean).join('\n'),
    section('한눈에 보기', aiSummary),
    section('정책 소개', detail.summary ?? detail.description),
    section('지원 내용', detail.benefitDescription),
    section(
      '신청 대상',
      [
        bullets(getEligibilitySummary(detail.eligibility ?? null)),
        hasMeaningfulText(detail.targetDescription)
          ? tidy(detail.targetDescription)
          : '',
      ]
        .filter(Boolean)
        .join('\n')
    ),
    section(
      '신청 기간',
      [
        periodOf(detail),
        hasMeaningfulText(applicationMethod) ? tidy(applicationMethod) : '',
      ]
        .filter(Boolean)
        .join('\n')
    ),
    section('신청 절차', steps),
    section('준비 서류', bullets(guide?.requiredDocuments ?? [])),
    section('유의사항', guide?.notes),
    section('문의처', guide?.contactInfo),
    section('링크', links),
  ]
    .filter(Boolean)
    .join('\n\n');
};

/** 카카오톡 텍스트 템플릿용 짧은 소개(200자 제한). 자세한 내용은 버튼 링크로 본다. */
export const buildPolicyKakaoText = ({
  detail,
  aiSummary,
}: Pick<PolicyShareSource, 'detail' | 'aiSummary'>): string => {
  const head = `[MOZIP] ${detail.title?.trim() ?? ''}\n신청 기간: ${periodOf(detail)}`;
  const intro = [aiSummary, detail.summary, detail.description].find(
    hasMeaningfulText
  );
  if (!intro) return head.slice(0, KAKAO_TEXT_MAX_LENGTH);

  const text = `${head}\n\n${tidy(intro).replace(/\s+/g, ' ')}`;
  return text.length > KAKAO_TEXT_MAX_LENGTH
    ? `${text.slice(0, KAKAO_TEXT_MAX_LENGTH - 1)}…`
    : text;
};
