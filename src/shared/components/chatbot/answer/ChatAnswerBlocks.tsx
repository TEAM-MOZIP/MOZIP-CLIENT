import type {
  ChatBlockResponse,
  ChatPolicyCardResponse,
} from '@pages/chatbot/types/chat';
import EligibilityConditions from '@pages/package/components/EligibilityConditions';
import mozipAiIcon from '@shared/assets/icons/mozip-ai.svg';
import ChatMessageContent from '@shared/components/chatbot/ChatMessageContent';
import ChatPolicyCard from '@shared/components/chatbot/answer/ChatPolicyCard';

type ChatAnswerBlocksProps = {
  blocks: ChatBlockResponse[];
  compact?: boolean;
  /** 빠른 선택 칩을 누를 수 있는지(가장 최근 답변이고 전송 중이 아닐 때만) */
  interactive?: boolean;
  onSelectPolicy?: (policyId: number) => void;
  onSendMessage?: (message: string) => void;
};

const MozipIcon = () => (
  <img
    src={mozipAiIcon}
    alt=""
    aria-hidden
    draggable={false}
    className="mt-[0.3rem] size-[1.6rem] shrink-0"
  />
);

const hasText = (value?: string | null): value is string =>
  Boolean(value?.trim());

/**
 * 챗봇 답변 블록 렌더러. 블록 종류별로 텍스트·정책 카드·비교표·단계·체크리스트·용어·빠른 선택 칩·조건별 판정·
 * 신청 링크를 그린다. 알 수 없는 블록은 그리지 않는다.
 */
const ChatAnswerBlocks = ({
  blocks,
  compact = false,
  interactive = false,
  onSelectPolicy,
  onSendMessage,
}: ChatAnswerBlocksProps) => {
  const small = compact ? 'text-caption' : 'text-body-3';
  const base = compact ? 'text-body-3' : 'text-body-2';

  const renderBlock = (block: ChatBlockResponse, index: number) => {
    switch (block.type) {
      case 'TEXT':
        return hasText(block.text) ? (
          <div key={index} className={`text-gray-800 ${base}`}>
            <ChatMessageContent content={block.text} />
          </div>
        ) : null;

      case 'CONCLUSION':
        return hasText(block.text) ? (
          <div
            key={index}
            className={`flex items-start gap-[0.8rem] text-gray-800 ${base}`}
          >
            <MozipIcon />
            <div className="min-w-0">
              <ChatMessageContent content={block.text} />
            </div>
          </div>
        ) : null;

      case 'POLICY_GROUP': {
        const policies = (block.policies ?? []).filter(
          (policy): policy is ChatPolicyCardResponse =>
            Boolean(policy.title?.trim())
        );
        if (policies.length === 0) return null;
        return (
          <section key={index} className="flex flex-col gap-[1rem]">
            {hasText(block.title) && (
              <p className={`font-bold text-title ${small}`}>{block.title}</p>
            )}
            {policies.map((policy) => (
              <ChatPolicyCard
                key={policy.policyId ?? policy.title}
                policy={policy}
                compact={compact}
                onClick={onSelectPolicy}
              />
            ))}
          </section>
        );
      }

      case 'COMPARISON': {
        const columns = block.columns ?? [];
        const rows = block.rows ?? [];
        if (columns.length < 2 || rows.length === 0) return null;
        return (
          <div
            key={index}
            className="w-full overflow-x-auto rounded-[1.2rem] border border-gray-200"
          >
            <table className={`w-full border-collapse ${small}`}>
              <thead>
                <tr className="bg-gray-100">
                  <th className="w-[22%] px-[1.2rem] py-[1rem]" />
                  {columns.map((column) => (
                    <th
                      key={column.policyId ?? column.title}
                      scope="col"
                      className="px-[1.2rem] py-[1rem] text-left font-bold break-keep text-title"
                    >
                      {column.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-t border-gray-200">
                    <th
                      scope="row"
                      className="bg-gray-100/40 px-[1.2rem] py-[1rem] text-left align-top font-semibold break-keep text-gray-500"
                    >
                      {row.label}
                    </th>
                    {columns.map((column, columnIndex) => (
                      <td
                        key={column.policyId ?? columnIndex}
                        className="px-[1.2rem] py-[1rem] align-top break-keep text-title"
                      >
                        {row.values?.[columnIndex] ?? '-'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      case 'STEPS': {
        const steps = (block.steps ?? []).filter((step) => hasText(step.title));
        if (steps.length === 0) return null;
        return (
          <section key={index} className="flex flex-col gap-[0.8rem]">
            {hasText(block.title) && (
              <p className={`font-bold text-title ${small}`}>{block.title}</p>
            )}
            <ol className="flex flex-col">
              {steps.map((step, stepIndex) => (
                <li
                  key={stepIndex}
                  className="relative pb-[1.6rem] pl-[3.6rem] last:pb-0"
                >
                  {stepIndex < steps.length - 1 && (
                    <span
                      aria-hidden
                      className="absolute top-[2.6rem] bottom-[0.2rem] left-[1.1rem] w-[0.2rem] bg-gray-200"
                    />
                  )}
                  <span
                    aria-hidden
                    className="absolute top-0 left-0 flex size-[2.4rem] items-center justify-center rounded-full border border-primary-sub-2 bg-primary-sub-3 text-caption font-extrabold text-title"
                  >
                    {stepIndex + 1}
                  </span>
                  <p className={`font-bold text-title ${small}`}>
                    {step.title}
                  </p>
                  {hasText(step.description) && (
                    <p className={`mt-[0.2rem] break-keep text-body ${small}`}>
                      {step.description}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          </section>
        );
      }

      case 'CHECKLIST': {
        const items = (block.items ?? []).filter(hasText);
        if (items.length === 0) return null;
        return (
          <section key={index} className="flex flex-col gap-[0.6rem]">
            {hasText(block.title) && (
              <p className={`font-bold text-title ${small}`}>{block.title}</p>
            )}
            <ul className="flex flex-col gap-[0.8rem] rounded-[1.2rem] border border-gray-200 px-[1.6rem] py-[1.4rem]">
              {items.map((item) => (
                <li
                  key={item}
                  className={`flex items-start gap-[1rem] break-keep text-title ${small}`}
                >
                  <span
                    aria-hidden
                    className="mt-[0.2rem] size-[1.8rem] shrink-0 rounded-[0.5rem] border-[0.15rem] border-gray-400"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        );
      }

      case 'TERM':
        return hasText(block.title) && hasText(block.text) ? (
          <div
            key={index}
            className="rounded-[1.2rem] border border-gray-200 px-[1.6rem] py-[1.4rem]"
          >
            <p className={`font-extrabold text-title ${base}`}>{block.title}</p>
            <p className={`mt-[0.4rem] break-keep text-gray-800 ${small}`}>
              {block.text}
            </p>
            {hasText(block.example) && (
              <p
                className={`mt-[0.8rem] rounded-[0.8rem] bg-gray-100 px-[1rem] py-[0.8rem] break-keep text-body ${small}`}
              >
                {block.example}
              </p>
            )}
          </div>
        ) : null;

      case 'QUICK_REPLIES': {
        const items = (block.items ?? []).filter(hasText);
        if (items.length === 0) return null;
        return (
          <div key={index} className="flex flex-col gap-[0.8rem]">
            {hasText(block.text) && (
              <p className={`text-gray-500 ${small}`}>{block.text}</p>
            )}
            <div className="flex flex-wrap gap-[0.8rem]">
              {items.map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={!interactive}
                  onClick={() => onSendMessage?.(item)}
                  className={`rounded-full border border-gray-300 bg-white px-[1.4rem] py-[0.7rem] text-title transition-colors enabled:cursor-pointer enabled:hover:border-primary enabled:hover:bg-primary-sub-3 disabled:opacity-60 ${small}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        );
      }

      case 'CONDITIONS':
        return block.conditions && block.conditions.length > 0 ? (
          <EligibilityConditions
            key={index}
            conditions={block.conditions}
            variant="chat"
          />
        ) : null;

      case 'LINKS': {
        const links = [
          { label: '신청하러 가기', href: block.links?.applicationUrl },
          { label: '원문 보기', href: block.links?.sourceUrl },
        ].filter((link): link is { label: string; href: string } =>
          hasText(link.href)
        );
        if (links.length === 0) return null;
        return (
          <div key={index} className="flex flex-wrap gap-[0.8rem]">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center rounded-[0.8rem] border border-gray-300 bg-white px-[1.4rem] py-[0.8rem] font-semibold text-title transition-colors hover:bg-gray-100 ${small}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="flex w-full flex-col gap-[1.6rem]">
      {blocks.map(renderBlock)}
    </div>
  );
};

export default ChatAnswerBlocks;
