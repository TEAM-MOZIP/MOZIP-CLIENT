import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@layout/RootLayout';
import HomePage from '@pages/home/HomePage';
import PackagePage from '@pages/package/PackagePage';

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
        path: 'package',
        element: <PackagePage />,
      },
    ],
  },
]);

export default router;
