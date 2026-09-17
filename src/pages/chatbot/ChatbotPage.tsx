import ChatSidebar from '@pages/chatbot/components/sidebar/ChatSidebar';
import ChatContent from '@pages/chatbot/components/ChatContent';
import { useChatSession } from '@pages/chatbot/hooks/useChatSession';

const ChatbotPage = () => {
  const { messages, sendMessage, reset, isSending } = useChatSession();

  return (
    <div className="flex h-[calc(100dvh-8.1rem)] w-full bg-white">
      <ChatSidebar
        histories={[]}
        activeChatId={messages.length > 0 ? 'current' : null}
        onNewChat={reset}
      />
      <main className="min-w-0 flex-1">
        <ChatContent
          messages={messages}
          onSendMessage={sendMessage}
          isSending={isSending}
        />
      </main>
    </div>
  );
};

export default ChatbotPage;
