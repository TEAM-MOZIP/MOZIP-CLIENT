import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <>
      {/* 공통 헤더/네비게이션 영역 */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
