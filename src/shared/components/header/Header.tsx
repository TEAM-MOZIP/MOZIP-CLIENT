import { Link, NavLink } from 'react-router-dom';
import logo from '@shared/assets/logo.svg';
import HeaderActions from '@shared/components/header/HeaderActions';

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    'cursor-pointer font-pretendard text-body-1 font-medium text-black transition-colors',
    isActive && 'font-semibold underline decoration-1 underline-offset-4',
  ]
    .filter(Boolean)
    .join(' ');

const navLabelClass = 'font-pretendard text-body-1 font-medium text-black';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white">
      <div className="grid h-[81px] w-full grid-cols-[1fr_auto_1fr] items-center px-16 py-[1.2rem]">
        <Link
          to="/"
          className="justify-self-start shrink-0 cursor-pointer"
          aria-label="MOZIP 홈"
        >
          <img
            src={logo}
            alt=""
            className="h-[2.8rem] w-auto"
            draggable={false}
          />
        </Link>

        <nav className="inline-flex items-center justify-self-center gap-[5.8rem]">
          <NavLink to="/" end className={navItemClass}>
            홈
          </NavLink>
          <NavLink to="/package" className={navItemClass}>
            정책 모음
          </NavLink>
          <span className={navLabelClass}>챗봇</span>
          <span className={navLabelClass}>마이페이지</span>
        </nav>

        <HeaderActions />
      </div>
    </header>
  );
};

export default Header;
