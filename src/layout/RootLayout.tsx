import { Outlet } from 'react-router-dom';
import Header from '@shared/components/header/Header';
import Footer from '@shared/components/footer/Footer';

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="pt-[8.1rem]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
