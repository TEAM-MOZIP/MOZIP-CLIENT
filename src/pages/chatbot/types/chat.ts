import type {
  ChatMatchedPolicyResponse,
  ChatRequest,
  ChatResponse,
  ChatTurn,
  ChatUnresolvedConditionResponse,
} from '@shared/apis/generated/Api';

export type {
  ChatMatchedPolicyResponse,
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
  isError?: boolean;
};

export type SendChatMessageRequest = {
  message: string;
  history?: ChatTurn[];
};

export type SendChatMessageResponse = ChatResponse;
