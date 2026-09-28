import type { ChatMessage, ChatTurn } from '@pages/chatbot/types/chat';

// 완료된 user–assistant 대화 히스토리를 API history 형식으로 변환
export const buildChatHistory = (messages: ChatMessage[]): ChatTurn[] => {
  const history: ChatTurn[] = [];

  for (let index = 0; index < messages.length - 1; index += 1) {
    const current = messages[index];
    const next = messages[index + 1];

    if (
      current?.role !== 'user' ||
      next?.role !== 'assistant' ||
      next.isError
    ) {
      continue;
    }

    // 그 턴에 카드로 보여준 정책 id — "신청 방법 알려줘", "두 정책 비교해줘" 같은 후속 질문이 가리키는 정책을
    // 서버가 알 수 있게 함께 보낸다.
    const policyIds = (next.matchedPolicies ?? [])
      .map((policy) => policy.policyId)
      .filter((id): id is number => typeof id === 'number');

    history.push({
      message: current.content,
      reply: next.content,
      ...(policyIds.length > 0 && { policyIds }),
    });
    index += 1;
  }

  return history;
};
