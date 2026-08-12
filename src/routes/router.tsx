import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@layout/RootLayout';
import HomePage from '@pages/home/HomePage';
import LoginPage from '@pages/login/LoginPage';
import SignupPage from '@pages/signup/SignupPage';
import MyPage from '@pages/mypage/MyPage';
import PackagePage from '@pages/package/PackagePage';
import ChatbotPage from '@pages/chatbot/ChatbotPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
      },
      {
        path: 'package',
        element: <PackagePage />,
      },
      {
        path: 'chatbot',
        element: <ChatbotPage />,
      },
    ],
  },
]);

export default router;
