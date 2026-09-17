import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '@shared/components/header/Header';
import Footer from '@shared/components/footer/Footer';
import ChatFloatingButton from '@shared/components/chatbot/ChatFloatingButton';
import ChatFloatingPanel from '@shared/components/chatbot/ChatFloatingPanel';
import { useChatPanelStore } from '@shared/stores/useChatPanelStore';

const RootLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isPanelOpen = useChatPanelStore((state) => state.isOpen);
  const togglePanel = useChatPanelStore((state) => state.toggle);
  const closePanel = useChatPanelStore((state) => state.close);
  const showFloatingButton = pathname !== '/' && pathname !== '/chatbot';

  const handleExpandPanel = () => {
    closePanel();
    navigate('/chatbot');
  };

  return (
    <>
      <Header />
      <main className="pt-[8.1rem]">
        <Outlet />
      </main>
      <Footer />

      {showFloatingButton && (
        <>
          <ChatFloatingButton
            className="fixed right-[4rem] bottom-[4rem] z-[200]"
            data-chat-floating="true"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={togglePanel}
          />

          {isPanelOpen && (
            <ChatFloatingPanel
              onClose={closePanel}
              onExpand={handleExpandPanel}
            />
          )}
        </>
      )}
    </>
  );
};

export default RootLayout;
