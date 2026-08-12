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
};
