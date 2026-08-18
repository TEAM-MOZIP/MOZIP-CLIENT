import { useMemo, useState } from 'react';
import searchIcon from '@shared/assets/icons/search.svg';
import deleteIcon from '@shared/assets/icons/delete.svg';
import SelectionChip from '@pages/onboarding/components/SelectionChip';
import { getVisibleDistricts } from '@pages/onboarding/utils/getVisibleDistricts';

type ResidenceStepProps = {
  value: string | null;
  onChange: (district: string) => void;
};

const ResidenceStep = ({ value, onChange }: ResidenceStepProps) => {
  const [query, setQuery] = useState('');

  const districts = useMemo(
    () => getVisibleDistricts(query, value),
    [query, value]
  );

  return (
    <div className="flex w-full max-w-[60rem] flex-col items-center">
      <label className="relative w-full max-w-[30rem]">
        <span className="sr-only">구 이름 검색</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="구 이름을 검색해보세요."
          className="h-[4.2rem] w-full rounded-full border border-gray-400 bg-white py-[1.2rem] pl-[3.8rem] pr-[3.2rem] text-body-3 text-black outline-none placeholder:text-gray-500 [&::-webkit-search-cancel-button]:appearance-none"
        />
        <img
          src={searchIcon}
          alt=""
          aria-hidden
          draggable={false}
          className="pointer-events-none absolute top-1/2 left-[1.4rem] size-[1.8rem] -translate-y-1/2"
        />
        {query && (
          <button
            type="button"
            aria-label="검색어 삭제"
            onClick={() => setQuery('')}
            className="absolute top-1/2 right-[1.4rem] -translate-y-1/2 cursor-pointer"
          >
            <img
              src={deleteIcon}
              alt=""
              aria-hidden
              draggable={false}
              className="size-[1.6rem]"
            />
          </button>
        )}
      </label>

      <div className="mt-[4rem] flex flex-wrap justify-center gap-[2rem_2.4rem]">
        {districts.length > 0 ? (
          districts.map((district) => (
            <SelectionChip
              key={district}
              label={district}
              selected={value === district}
              onClick={() => onChange(district)}
            />
          ))
        ) : (
          <p className="text-body-3 text-gray-500">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default ResidenceStep;
