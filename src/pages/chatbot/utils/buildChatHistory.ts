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

    history.push({
      message: current.content,
      reply: next.content,
    });
    index += 1;
  }

  return history;
};
