import { useMemo, useState } from 'react';
import searchIcon from '@shared/assets/icons/search.svg';
import deleteIcon from '@shared/assets/icons/delete.svg';
import SelectionChip from '@pages/onboarding/components/SelectionChip';
import { getVisibleRegions } from '@pages/onboarding/utils/getVisibleRegions';
import type { RegionResponse } from '@pages/onboarding/types/onboarding';

type ResidenceStepProps = {
  regions: RegionResponse[];
  isLoading: boolean;
  value: number | null;
  onChange: (regionId: number) => void;
};

const ResidenceStep = ({
  regions,
  isLoading,
  value,
  onChange,
}: ResidenceStepProps) => {
  const [query, setQuery] = useState('');

  const visibleRegions = useMemo(
    () => getVisibleRegions(regions, query, value),
    [regions, query, value]
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
        {isLoading ? (
          <p className="text-body-3 text-gray-500">
            지역 목록을 불러오는 중이에요.
          </p>
        ) : visibleRegions.length > 0 ? (
          visibleRegions.map((region) => (
            <SelectionChip
              key={region.id}
              label={region.name}
              selected={value === region.id}
              onClick={() => onChange(region.id)}
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
