import { useState } from 'react';
import searchIcon from '@shared/assets/icons/search.svg';
import deleteIcon from '@shared/assets/icons/delete.svg';
import bellIcon from '@shared/assets/icons/bell.svg';
import personIcon from '@shared/assets/icons/person.svg';

const HeaderActions = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex shrink-0 items-center justify-self-end gap-[1.6rem]">
      <label className="relative">
        <span className="sr-only">검색</span>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="검색"
          className="w-[24rem] rounded-full border border-gray-200 bg-white py-[0.8rem] pr-[4rem] pl-[4rem] text-caption text-body outline-none placeholder:text-gray-500 [&::-webkit-search-cancel-button]:appearance-none"
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
        className="flex size-[4rem] cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white"
      >
        <img
          src={bellIcon}
          alt=""
          className="h-[2.2rem] w-auto"
          aria-hidden
          draggable={false}
        />
      </button>

      <button
        type="button"
        aria-label="마이페이지"
        className="flex size-[4rem] cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white"
      >
        <img
          src={personIcon}
          alt=""
          className="size-[2.2rem]"
          aria-hidden
          draggable={false}
        />
      </button>
    </div>
  );
};

export default HeaderActions;
