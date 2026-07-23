import { Link, NavLink } from 'react-router-dom';
import logo from '@shared/assets/logo.svg';
import HeaderActions from '@shared/components/header/HeaderActions';

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    'cursor-pointer font-pretendard text-body-1 text-black transition-colors border-b-[3px]',
    isActive ? 'border-primary !font-bold' : 'border-transparent font-normal',
  ].join(' ');

const navLabelClass =
  'font-pretendard text-body-1 font-normal text-black border-b-[3px] border-transparent';

const Header = () => {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 border-b border-gray-200 bg-white">
      <div className="grid h-[81px] w-full grid-cols-[minmax(max-content,1fr)_auto_minmax(max-content,1fr)] items-center px-16 py-[1.2rem]">
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

        <nav className="inline-flex items-center justify-self-center whitespace-nowrap gap-[6rem] mx-[2rem]">
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
