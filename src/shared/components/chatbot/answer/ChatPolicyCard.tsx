import type { ChatPolicyCardResponse } from '@pages/chatbot/types/chat';
import { STATUS_OUTLINE_CLASS } from '@pages/package/components/FilterChip';
import { formatAgeRange } from '@pages/package/utils/formatAgeRange';
import {
  AVAILABILITY_DOT_CLASS,
  getAvailabilityBadge,
} from '@pages/package/utils/getAvailabilityBadge';
import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';

const ELIGIBILITY_CHIPS: Record<
  NonNullable<ChatPolicyCardResponse['eligibilityStatus']>,
  { label: string; className: string }
> = {
  ELIGIBLE: {
    label: '자격 충족',
    className: 'border-primary bg-primary-sub-2 text-gray-700',
  },
  NEEDS_REVIEW: {
    label: '자격 확인 필요',
    className: 'border-gray-400 bg-gray-100 text-gray-600',
  },
  INELIGIBLE: {
    label: '자격 미충족',
    className: 'border-gray-300 bg-white text-gray-500',
  },
};

const MAX_VISIBLE_CATEGORIES = 2;
const CHIP_CLASS_NAME =
  'shrink-0 whitespace-nowrap rounded-full border px-[1rem] py-[0.2rem] text-caption font-semibold text-gray-700';

type ChatPolicyCardProps = {
  policy: ChatPolicyCardResponse;
  compact?: boolean;
  onClick?: (policyId: number) => void;
};

/** 챗봇 답변의 정책 카드: 요약 + MOZIP 추천 이유 + 핵심 칩. 누르면 정책 상세가 열린다. */
const ChatPolicyCard = ({
  policy,
  compact = false,
  onClick,
}: ChatPolicyCardProps) => {
  const badge = getAvailabilityBadge(policy.availability ?? null);
  const eligibility = policy.eligibilityStatus
    ? ELIGIBILITY_CHIPS[policy.eligibilityStatus]
    : null;
  const categories = (policy.categories ?? [])
    .filter((category) => category.name?.trim())
    .slice(0, MAX_VISIBLE_CATEGORIES);
  const regionName =
    policy.regionScope === 'NATIONAL'
      ? '전국'
      : policy.regions?.find((region) => region.name?.trim())?.name;
  const ageLabel = formatAgeRange(
    policy.minimumAge ?? null,
    policy.maximumAge ?? null
  );
  const policyId = policy.policyId;

  return (
    <button
      type="button"
      disabled={policyId == null}
      onClick={() => policyId != null && onClick?.(policyId)}
      aria-label={`${policy.title} 상세 보기`}
      className={[
        'block w-full rounded-[1.4rem] border border-gray-200 bg-white text-left transition-colors',
        'enabled:cursor-pointer enabled:hover:border-gray-300 enabled:hover:bg-gray-100/40',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400',
        compact ? 'px-[1.4rem] py-[1.2rem]' : 'px-[1.6rem] py-[1.4rem]',
      ].join(' ')}
    >
      <div className="flex items-start gap-[0.8rem]">
        <p
          className={`min-w-0 flex-1 break-keep font-bold text-title ${compact ? 'text-body-3' : 'text-body-2'}`}
        >
          {policy.title}
        </p>
        {badge && (
          <span
            className={`mt-[0.1rem] inline-flex shrink-0 items-center gap-[0.5rem] whitespace-nowrap rounded-full border bg-white px-[0.8rem] py-[0.1rem] text-caption font-medium text-gray-600 outline-gray-200 ${STATUS_OUTLINE_CLASS}`}
          >
            <span
              aria-hidden
              className={`size-[0.7rem] shrink-0 rounded-full ${AVAILABILITY_DOT_CLASS[badge.tone]}`}
            />
            {badge.label}
          </span>
        )}
        {policyId != null && (
          <span
            aria-hidden
            className="shrink-0 text-[1.8rem] leading-none text-gray-400"
          >
            ›
          </span>
        )}
      </div>
      {policy.summary?.trim() && (
        <p
          className={`mt-[0.2rem] break-keep text-body ${compact ? 'text-caption' : 'text-body-3'}`}
        >
          {policy.summary}
        </p>
      )}

      {policy.reason?.trim() && (
        <p
          className={`mt-[0.8rem] flex items-start gap-[0.8rem] rounded-[0.8rem] border border-gray-200 px-[1rem] py-[0.7rem] break-keep text-title ${compact ? 'text-caption' : 'text-body-3'}`}
        >
          <img
            src={mozipAiIcon}
            alt=""
            aria-hidden
            draggable={false}
            className="mt-[0.2rem] size-[1.6rem] shrink-0"
          />
          <span className="min-w-0">
            <span className="font-bold">MOZIP 추천 이유</span> · {policy.reason}
          </span>
        </p>
      )}

      <div className="mt-[0.8rem] flex flex-wrap gap-[0.6rem]">
        {policy.highlight?.trim() && (
          <span
            className={`${CHIP_CLASS_NAME} border-primary bg-primary-sub-2`}
          >
            {policy.highlight}
          </span>
        )}
        {categories.map((category) => (
          <span
            key={category.id ?? category.name}
            className={`${CHIP_CLASS_NAME} border-[#8CE29C] bg-[#DDFAD4]`}
          >
            {category.name}
          </span>
        ))}
        {regionName && (
          <span className={`${CHIP_CLASS_NAME} border-[#97C4FF] bg-[#D7EAFF]`}>
            {regionName}
          </span>
        )}
        <span className={`${CHIP_CLASS_NAME} border-[#C9B8FF] bg-[#EEE8FF]`}>
          {ageLabel}
        </span>
        {eligibility && (
          <span className={`${CHIP_CLASS_NAME} ${eligibility.className}`}>
            {eligibility.label}
          </span>
        )}
      </div>
    </button>
  );
};

export default ChatPolicyCard;
