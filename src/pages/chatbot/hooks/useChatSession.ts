import { useState } from 'react';
import { useSendChatMessage } from '@pages/chatbot/hooks/useSendChatMessage';
import type { ChatMessage } from '@pages/chatbot/types/chat';
import { buildChatHistory } from '@pages/chatbot/utils/buildChatHistory';
import { getChatErrorMessage } from '@pages/chatbot/utils/getChatErrorMessage';

const createMessageId = (role: ChatMessage['role']) =>
  `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const useChatSession = (initialMessages: ChatMessage[] = []) => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const { mutate, isPending } = useSendChatMessage();

  const sendMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || isPending) return;

    const history = buildChatHistory(messages);
    const userMessage: ChatMessage = {
      id: createMessageId('user'),
      role: 'user',
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);

    mutate(
      { message: trimmed, history },
      {
        onSuccess: (data) => {
          const assistantMessage: ChatMessage = {
            id: createMessageId('assistant'),
            role: 'assistant',
            content:
              data.reply?.trim() ||
              '응답을 받지 못했습니다. 잠시 후 다시 시도해 주세요.',
            matchedPolicies: data.matchedPolicies,
            unresolvedConditions: data.unresolvedConditions,
            blocks: data.blocks,
            followUps: data.followUps,
          };

          setMessages((prev) => [...prev, assistantMessage]);
        },
        onError: (error) => {
          const assistantMessage: ChatMessage = {
            id: createMessageId('assistant'),
            role: 'assistant',
            content: getChatErrorMessage(error),
            isError: true,
          };

          setMessages((prev) => [...prev, assistantMessage]);
        },
      }
    );
  };

  const reset = () => {
    setMessages([]);
  };

  // 이미 응답을 받아온 질문/답변 쌍을 대화 목록에 바로 추가한다 — sendMessage와
  // 달리 POST /api/chat/messages를 다시 호출하지 않는다.
  const appendExchange = (question: string, answer: string) => {
    const userMessage: ChatMessage = {
      id: createMessageId('user'),
      role: 'user',
      content: question,
    };
    const assistantMessage: ChatMessage = {
      id: createMessageId('assistant'),
      role: 'assistant',
      content: answer,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  };

  const appendMessage = (role: ChatMessage['role'], content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: createMessageId(role), role, content },
    ]);
  };

  return {
    messages,
    sendMessage,
    appendExchange,
    appendMessage,
    reset,
    isSending: isPending,
  };
};
