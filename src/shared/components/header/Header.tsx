import { Link, NavLink } from 'react-router-dom';

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  [
    'cursor-pointer font-pretendard text-nav text-black transition-colors',
    isActive && 'font-semibold underline decoration-1 underline-offset-4',
  ]
    .filter(Boolean)
    .join(' ');

const Header = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="inline-flex h-[81px] w-full box-border items-center px-16 py-[1.2rem]">
        <Link
          to="/"
          className="shrink-0 cursor-pointer text-heading-4 text-title tracking-wide"
        >
          MOZIP
        </Link>

        <span className="flex-1" aria-hidden />

        <nav className="inline-flex shrink-0 items-center gap-[5.8rem]">
          <NavLink to="/" end className={navItemClass}>
            홈
          </NavLink>
          <NavLink to="/package" className={navItemClass}>
            정책 모음
          </NavLink>
          <span className="font-pretendard text-nav text-black">챗봇</span>
          <span className="font-pretendard text-nav text-black">
            마이페이지
          </span>
        </nav>

        <span className="flex-1" aria-hidden />

        <button
          type="button"
          aria-label="마이페이지"
          className="shrink-0 cursor-pointer text-black"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20a8 8 0 1 1 16 0H4Z" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
