import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@layout/RootLayout';
import HomePage from '@pages/home/HomePage';
import LoginPage from '@pages/login/LoginPage';
import SignupPage from '@pages/signup/SignupPage';
import MyPage from '@pages/mypage/MyPage';
import PackagePage from '@pages/package/PackagePage';
import ChatbotPage from '@pages/chatbot/ChatbotPage';
import OnboardingPage from '@pages/onboarding/OnboardingPage';
import KakaoOAuthCallback from '@pages/login/hooks/KakaoOAuthCallback';

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
      {
        path: 'onboarding',
        element: <OnboardingPage />,
      },
    ],
  },
  {
    path: '/oauth/kakao/callback',
    element: <KakaoOAuthCallback />,
  },
]);

export default router;
