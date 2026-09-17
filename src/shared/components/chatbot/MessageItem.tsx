import type {
  ChatMatchedPolicyResponse,
  ChatMessageRole,
} from '@pages/chatbot/types/chat';

type MessageItemProps = {
  role: ChatMessageRole;
  content: string;
  compact?: boolean;
  matchedPolicies?: ChatMatchedPolicyResponse[];
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
}: MessageItemProps) => {
  const isUser = role === 'user';
  const policies =
    matchedPolicies?.filter((policy) => policy.title?.trim()) ?? [];

  return (
    <div
      className={['flex w-full', isUser ? 'justify-end' : 'justify-start'].join(
        ' '
      )}
    >
      <div
        className={[
          'flex max-w-[min(68rem,85%)] flex-col gap-[0.8rem]',
          isUser ? 'items-end' : 'items-start',
        ].join(' ')}
      >
        <div
          className={[
            'w-full whitespace-pre-wrap break-words text-gray-800',
            compact ? 'text-body-3' : 'text-body-2',
            isUser
              ? 'rounded-[2rem] bg-primary-sub-3 px-[1.6rem] py-[1.2rem]'
              : compact
                ? 'rounded-[2rem] bg-gray-100 px-[1.6rem] py-[1.2rem]'
                : 'p-[0.8rem]',
          ].join(' ')}
        >
          {content}
        </div>

        {!isUser && policies.length > 0 && (
          <ul
            className={[
              'flex w-full flex-col gap-[1rem]',
              compact ? 'px-[0.4rem]' : 'px-[0.8rem]',
            ].join(' ')}
          >
            {policies.map((policy, index) => (
              <li
                key={`${policy.policyId ?? policy.title}-${index}`}
                className={[
                  'rounded-[1.2rem] border border-gray-200 bg-white px-[1.2rem] py-[0.8rem] text-gray-700',
                  compact ? 'text-caption' : 'text-body-3',
                ].join(' ')}
              >
                <span className="font-medium text-gray-800">
                  {policy.title}
                </span>
                {policy.eligibilityStatus && (
                  <span
                    className={[
                      'ml-[1.2rem] text-gray-400',
                      compact ? 'text-[1.2rem]' : 'text-[1.4rem]',
                    ].join(' ')}
                  >
                    {ELIGIBILITY_LABEL[policy.eligibilityStatus]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
