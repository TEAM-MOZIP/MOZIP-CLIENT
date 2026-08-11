import { useState } from 'react';
import ChatSidebar from '@pages/chatbot/components/sidebar/ChatSidebar';
import ChatContent from '@pages/chatbot/components/ChatContent';
import type { ChatMessage } from '@pages/chatbot/types/chat';
import { MOCK_CHAT_HISTORY } from '@pages/chatbot/constants/mockChatHistory';
import {
  MOCK_ASSISTANT_REPLY,
  MOCK_CHAT_MESSAGES,
} from '@pages/chatbot/constants/mockChatMessages';

const ChatbotPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const handleSearchOpen = (open: boolean) => {
    setIsSearchOpen(open);
  };

  const handleNewChat = () => {
    setIsSearchOpen(false);
    setActiveChatId(null);
    setMessages([]);
  };

  const handleSelectChat = (id: string) => {
    setIsSearchOpen(false);
    setActiveChatId(id);
    setMessages(MOCK_CHAT_MESSAGES);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
    };
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      content: MOCK_ASSISTANT_REPLY,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);

    if (!activeChatId) {
      setActiveChatId('new');
    }
  };

  return (
    <div className="flex h-[calc(100dvh-8.1rem)] w-full bg-white">
      <ChatSidebar
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSearch={() => handleSearchOpen(true)}
        onSelectChat={handleSelectChat}
      />
      <main className="min-w-0 flex-1">
        <ChatContent
          isSearchOpen={isSearchOpen}
          histories={MOCK_CHAT_HISTORY}
          messages={messages}
          onSelectChat={handleSelectChat}
          onCloseSearch={() => handleSearchOpen(false)}
          onSendMessage={handleSendMessage}
        />
      </main>
    </div>
  );
};

export default ChatbotPage;
