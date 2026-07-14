const HeaderActions = () => {
  return (
    <div className="flex shrink-0 items-center justify-self-end gap-[1.6rem]">
      <label className="relative">
        <span className="sr-only">검색</span>
        <input
          type="search"
          placeholder="검색"
          className="w-[24rem] rounded-full border border-gray-200 bg-white py-[0.8rem] pr-[1.2rem] pl-[4rem] text-caption text-body outline-none placeholder:text-gray-500"
        />
        <svg
          className="pointer-events-none absolute top-1/2 left-[1.2rem] size-[2rem] -translate-y-1/2 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
        </svg>
      </label>

      <button
        type="button"
        aria-label="알림"
        className="cursor-pointer text-black"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="마이페이지"
        className="cursor-pointer text-black"
      >
        <svg
          className="size-[2.6rem]"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 20a8 8 0 1 1 16 0H4Z" />
        </svg>
      </button>
    </div>
  );
};

export default HeaderActions;
