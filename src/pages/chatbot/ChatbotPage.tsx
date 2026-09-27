import ChatSidebar from '@pages/chatbot/components/sidebar/ChatSidebar';
import ChatContent from '@pages/chatbot/components/ChatContent';
import { useChatSessions } from '@pages/chatbot/hooks/useChatSessions';

const ChatbotPage = () => {
  const {
    sessions,
    activeSessionId,
    activeMessages,
    sendMessage,
    newChat,
    selectChat,
    deleteChat,
    isSending,
  } = useChatSessions();

  const histories = sessions.map((s) => ({
    id: s.id,
    title: s.title,
    timestamp: String(s.createdAt),
  }));

  return (
    <div className="flex h-[calc(100dvh-8.1rem)] w-full bg-white">
      <ChatSidebar
        histories={histories}
        activeChatId={activeSessionId}
        onNewChat={newChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
      />
      <main className="min-w-0 flex-1">
        <ChatContent
          messages={activeMessages}
          onSendMessage={sendMessage}
          isSending={isSending}
        />
      </main>
    </div>
  );
};

export default ChatbotPage;
