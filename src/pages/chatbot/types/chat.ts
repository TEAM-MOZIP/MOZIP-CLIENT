import type {
  ChatBlockResponse,
  ChatMatchedPolicyResponse,
  ChatPolicyCardResponse,
  ChatRequest,
  ChatResponse,
  ChatTurn,
  ChatUnresolvedConditionResponse,
} from '@shared/apis/generated/Api';

export type {
  ChatBlockResponse,
  ChatMatchedPolicyResponse,
  ChatPolicyCardResponse,
  ChatRequest,
  ChatResponse,
  ChatTurn,
  ChatUnresolvedConditionResponse,
};

export type ChatHistory = {
  id: string;
  title: string;
  timestamp: string;
};

export type ChatMessageRole = 'user' | 'assistant';

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  content: string;
  matchedPolicies?: ChatMatchedPolicyResponse[];
  unresolvedConditions?: ChatUnresolvedConditionResponse[];
  // 블록 답변(있으면 content 대신 블록으로 그린다)과 후속 질문 칩
  blocks?: ChatBlockResponse[];
  followUps?: string[];
  isError?: boolean;
};

export type SendChatMessageRequest = {
  message: string;
  history?: ChatTurn[];
};

export type SendChatMessageResponse = ChatResponse;
