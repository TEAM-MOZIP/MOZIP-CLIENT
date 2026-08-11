import type { ChatMessage } from '@pages/chatbot/types/chat';

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    content:
      '용산구 거주 대학생이 받을 수 있는 혜택과 신청 가이드를 알려주세요.',
  },
  {
    id: 'm2',
    role: 'assistant',
    content:
      '네. 용산구 거주 대학생이 받을 수 있는 혜택과 신청 가이드를 알려드리겠습니다.',
  },
  {
    id: 'm3',
    role: 'user',
    content: '테스트 질문입니다.',
  },
  {
    id: 'm4',
    role: 'assistant',
    content: '테스트 답변입니다.',
  },
];

export const MOCK_ASSISTANT_REPLY = 'Mozip AI 테스트 답변입니다.';
