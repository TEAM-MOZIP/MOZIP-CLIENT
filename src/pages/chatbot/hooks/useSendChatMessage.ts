import { useMutation } from '@tanstack/react-query';
import { postChatMessage } from '@pages/chatbot/apis/chatApi';
import type { SendChatMessageRequest } from '@pages/chatbot/types/chat';

export const useSendChatMessage = () => {
  return useMutation({
    mutationFn: (payload: SendChatMessageRequest) => postChatMessage(payload),
  });
};
