import { Outlet } from 'react-router-dom';
import Header from '@shared/components/header/Header';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-[8.1rem]">
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
