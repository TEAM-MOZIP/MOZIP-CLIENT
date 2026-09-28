import axiosInstance from '@shared/apis/axiosInstance';
import { ENDPOINTS } from '@shared/apis/endpoints';
import type {
  SendChatMessageRequest,
  SendChatMessageResponse,
} from '@pages/chatbot/types/chat';

export const postChatMessage = async (payload: SendChatMessageRequest) => {
  const { data } = await axiosInstance.post<SendChatMessageResponse>(
    ENDPOINTS.CHAT.MESSAGES,
    payload
  );
  return data;
};
