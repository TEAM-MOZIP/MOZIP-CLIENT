import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '@shared/assets/icons/search.svg';
import deleteIcon from '@shared/assets/icons/delete.svg';
import bellIcon from '@shared/assets/icons/bell.svg';
import personIcon from '@shared/assets/icons/person.svg';
import defaultProfileIcon from '@shared/assets/icons/default-profile.svg';

// temporary state for UI development
const MOCK_NICKNAME = '닉네임';

const HeaderActions = () => {
  const [query, setQuery] = useState('');

  // temporary state for UI development
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isProfileOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isProfileOpen]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
  };

  return (
    <div className="col-start-3 hidden min-[600px]:flex min-w-max shrink-0 items-center justify-self-end gap-[1.6rem] pl-[2rem]">
      <label className="relative shrink-0">
        <span className="sr-only">검색</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색"
          className="w-[26rem] h-[4.2rem] rounded-full border border-gray-300 bg-white px-[4rem] text-caption text-body outline-none placeholder:text-gray-500 [&::-webkit-search-cancel-button]:appearance-none"
        />
        <img
          src={searchIcon}
          alt=""
          className="pointer-events-none absolute top-1/2 left-[1.2rem] size-[2rem] -translate-y-1/2"
          aria-hidden
          draggable={false}
        />
        {query && (
          <button
            type="button"
            aria-label="검색어 삭제"
            onClick={() => setQuery('')}
            className="absolute top-1/2 right-[1.2rem] -translate-y-1/2 cursor-pointer"
          >
            <img
              src={deleteIcon}
              alt=""
              className="size-[1.6rem]"
              aria-hidden
              draggable={false}
            />
          </button>
        )}
      </label>

      <button
        type="button"
        aria-label="알림"
        className="flex size-[4.2rem] shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white"
      >
        <img
          src={bellIcon}
          alt=""
          className="h-[2.2rem] w-auto"
          aria-hidden
          draggable={false}
        />
      </button>

      <div ref={profileRef} className="relative shrink-0">
        <button
          type="button"
          aria-label="프로필"
          aria-expanded={isProfileOpen}
          aria-haspopup="menu"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className={[
            'flex shrink-0 cursor-pointer items-center justify-center border border-gray-300 transition-colors',
            isLoggedIn
              ? 'gap-[0.8rem] rounded-full py-[0.4rem] pr-[1.2rem] pl-[0.4rem]'
              : 'size-[4rem] rounded-full',
            isProfileOpen ? 'bg-gray-100' : 'bg-white',
          ].join(' ')}
        >
          {isLoggedIn ? (
            <>
              <img
                src={defaultProfileIcon}
                alt=""
                className="size-[3.2rem] shrink-0"
                aria-hidden
                draggable={false}
              />
              <span className="shrink-0 whitespace-nowrap font-pretendard text-body font-medium">
                {MOCK_NICKNAME}
              </span>
            </>
          ) : (
            <img
              src={personIcon}
              alt=""
              className="size-[2.2rem] shrink-0"
              aria-hidden
              draggable={false}
            />
          )}
        </button>

        {isProfileOpen && (
          <div
            role="menu"
            className="absolute top-[calc(100%+0.8rem)] right-0 z-50 overflow-hidden rounded-[1.2rem] border border-gray-300 bg-white"
          >
            {isLoggedIn ? (
              <>
                <Link
                  to="/mypage"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full cursor-pointer items-center justify-center px-[1.9rem] py-[0.8rem] font-pretendard text-caption text-body whitespace-nowrap hover:bg-gray-100"
                >
                  마이페이지
                </Link>
                <div className="h-px bg-gray-300" aria-hidden />
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full cursor-pointer items-center justify-center px-[1.9rem] py-[0.8rem] font-pretendard text-caption text-body whitespace-nowrap hover:bg-gray-100"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full cursor-pointer items-center justify-center px-[1.8rem] py-[0.8rem] font-pretendard text-caption text-body whitespace-nowrap hover:bg-gray-100"
                >
                  로그인
                </Link>
                <div className="h-px bg-gray-300" aria-hidden />
                <Link
                  to="/signup"
                  role="menuitem"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex w-full cursor-pointer items-center justify-center px-[1.8rem] py-[0.8rem] font-pretendard text-caption text-body whitespace-nowrap hover:bg-gray-100"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderActions;
