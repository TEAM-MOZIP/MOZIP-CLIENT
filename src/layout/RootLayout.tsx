import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from '@shared/components/header/Header';
import Footer from '@shared/components/footer/Footer';
import ChatFloatingButton from '@shared/components/chatbot/ChatFloatingButton';
import ChatFloatingPanel from '@shared/components/chatbot/ChatFloatingPanel';

const RootLayout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const showFloatingButton = pathname !== '/' && pathname !== '/chatbot';

  const handleExpandPanel = () => {
    setIsPanelOpen(false);
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
            className="fixed right-[4rem] bottom-[4rem] z-100"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={() => setIsPanelOpen((prev) => !prev)}
          />

          {isPanelOpen && (
            <ChatFloatingPanel
              onClose={() => setIsPanelOpen(false)}
              onExpand={handleExpandPanel}
            />
          )}
        </>
      )}
    </>
  );
};

export default RootLayout;
