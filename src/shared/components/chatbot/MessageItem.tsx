import { useState } from 'react';
import type {
  ChatBlockResponse,
  ChatMatchedPolicyResponse,
  ChatMessageRole,
} from '@pages/chatbot/types/chat';
import PolicyDetailModal from '@pages/package/components/PolicyDetailModal';
import ChatMessageContent from '@shared/components/chatbot/ChatMessageContent';
import ChatAnswerBlocks from '@shared/components/chatbot/answer/ChatAnswerBlocks';

type MessageItemProps = {
  role: ChatMessageRole;
  content: string;
  compact?: boolean;
  matchedPolicies?: ChatMatchedPolicyResponse[];
  blocks?: ChatBlockResponse[];
  followUps?: string[];
  /** 가장 최근 답변이고 전송 중이 아니면 빠른 선택·후속 질문 칩을 누를 수 있다 */
  interactive?: boolean;
  /** 후속 질문 칩은 가장 최근 답변에만 보여준다 */
  showFollowUps?: boolean;
  onSendMessage?: (message: string) => void;
};

const ELIGIBILITY_LABEL: Record<
  NonNullable<ChatMatchedPolicyResponse['eligibilityStatus']>,
  string
> = {
  ELIGIBLE: '신청 가능',
  INELIGIBLE: '신청 불가',
  NEEDS_REVIEW: '자격 확인 필요',
};

const MessageItem = ({
  role,
  content,
  compact = false,
  matchedPolicies,
  blocks,
  followUps,
  interactive = false,
  showFollowUps = false,
  onSendMessage,
}: MessageItemProps) => {
  const isUser = role === 'user';
  // 블록 답변이면 말풍선 없이 블록으로 그린다.
  const hasBlocks = !isUser && (blocks?.length ?? 0) > 0;
  // 블록 안에 정책 카드가 있으면 아래 정책 목록(matchedPolicies)은 중복이라 숨긴다. AI가 카드 블록을 만들지 못한
  // 답변(텍스트만 있는 경우)에는 서버가 고른 정책을 기존 목록으로라도 보여준다.
  const hasPolicyCards =
    blocks?.some(
      (block) =>
        (block.type === 'POLICY_GROUP' && (block.policies?.length ?? 0) > 0) ||
        (block.type === 'COMPARISON' && (block.columns?.length ?? 0) > 0)
    ) ?? false;
  const visibleFollowUps =
    !isUser && showFollowUps
      ? (followUps ?? []).filter((followUp) => followUp.trim())
      : [];
  const policies =
    matchedPolicies?.filter((policy) => policy.title?.trim()) ?? [];
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(null);

  return (
    <div
      className={['flex w-full', isUser ? 'justify-end' : 'justify-start'].join(
        ' '
      )}
    >
      <div
        className={[
          'flex flex-col gap-[0.8rem]',
          // 미니 챗봇은 폭이 좁아 블록 답변(카드·표)은 패널 폭을 다 쓴다.
          compact && hasBlocks ? 'w-full' : 'max-w-[min(68rem,85%)]',
          isUser ? 'items-end' : 'items-start',
        ].join(' ')}
      >
        {hasBlocks ? (
          <div className={compact ? 'w-full' : 'w-full p-[0.8rem]'}>
            <ChatAnswerBlocks
              blocks={blocks ?? []}
              compact={compact}
              interactive={interactive}
              onSelectPolicy={setSelectedPolicyId}
              onSendMessage={onSendMessage}
            />
          </div>
        ) : (
          <div
            className={[
              'w-full break-words text-gray-800',
              isUser ? 'whitespace-pre-wrap' : '',
              compact ? 'text-body-3' : 'text-body-2',
              isUser
                ? 'rounded-[2rem] bg-primary-sub-3 px-[1.6rem] py-[1.2rem]'
                : compact
                  ? 'rounded-[2rem] bg-gray-100 px-[1.6rem] py-[1.2rem]'
                  : 'p-[0.8rem]',
            ].join(' ')}
          >
            {isUser ? content : <ChatMessageContent content={content} />}
          </div>
        )}

        {!isUser && !hasPolicyCards && policies.length > 0 && (
          <ul
            className={[
              'flex w-full flex-col gap-[1rem]',
              compact ? 'px-[0.4rem]' : 'px-[0.8rem]',
            ].join(' ')}
          >
            {policies.map((policy, index) => (
              <li key={`${policy.policyId ?? policy.title}-${index}`}>
                <button
                  type="button"
                  disabled={policy.policyId == null}
                  onClick={() => {
                    if (policy.policyId != null) {
                      setSelectedPolicyId(policy.policyId);
                    }
                  }}
                  aria-label={`${policy.title} 상세 보기`}
                  className={[
                    'flex w-full items-center gap-[1.2rem] rounded-[1.2rem] border border-gray-200 bg-white px-[1.2rem] py-[0.8rem] text-left text-gray-700 transition-colors',
                    'enabled:cursor-pointer enabled:hover:border-gray-300 enabled:hover:bg-gray-100',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400',
                    compact ? 'text-caption' : 'text-body-3',
                  ].join(' ')}
                >
                  <span className="min-w-0 flex-1 font-medium text-gray-800">
                    {policy.title}
                  </span>
                  {policy.eligibilityStatus && (
                    <span
                      className={[
                        'shrink-0 text-gray-400',
                        compact ? 'text-[1.2rem]' : 'text-[1.4rem]',
                      ].join(' ')}
                    >
                      {ELIGIBILITY_LABEL[policy.eligibilityStatus]}
                    </span>
                  )}
                  {policy.policyId != null && (
                    <span aria-hidden="true" className="shrink-0 text-gray-400">
                      ›
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
        {visibleFollowUps.length > 0 && (
          <div
            className={[
              compact
                ? 'flex w-full flex-col items-start gap-[0.6rem]'
                : 'flex flex-wrap gap-[0.8rem] px-[0.8rem]',
            ].join(' ')}
          >
            {visibleFollowUps.map((followUp) => (
              <button
                key={followUp}
                type="button"
                disabled={!interactive}
                onClick={() => onSendMessage?.(followUp)}
                className={[
                  'inline-flex max-w-full items-start gap-[0.6rem] border border-gray-200 bg-gray-100 text-left break-keep text-gray-700 transition-colors',
                  compact
                    ? 'rounded-[1.2rem] px-[1.2rem] py-[0.6rem]'
                    : 'rounded-full px-[1.2rem] py-[0.6rem]',
                  'enabled:cursor-pointer enabled:hover:border-gray-300 enabled:hover:bg-gray-200 disabled:opacity-60',
                  compact ? 'text-caption' : 'text-body-3',
                ].join(' ')}
              >
                <span aria-hidden className="shrink-0 text-gray-400">
                  ↳
                </span>
                {followUp}
              </button>
            ))}
          </div>
        )}
      </div>

      {selectedPolicyId !== null && (
        <PolicyDetailModal
          policyId={selectedPolicyId}
          onClose={() => setSelectedPolicyId(null)}
        />
      )}
    </div>
  );
};

export default MessageItem;
