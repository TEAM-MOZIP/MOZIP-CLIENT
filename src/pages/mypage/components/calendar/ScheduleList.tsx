import type { ScheduleItem } from '@pages/mypage/types';

type ScheduleListProps = {
  selectedDate: Date;
  schedules: ScheduleItem[];
};

const ScheduleList = ({ selectedDate, schedules }: ScheduleListProps) => {
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const isEmpty = schedules.length === 0;

  return (
    <aside className="flex w-full flex-col rounded-[0.4rem] bg-primary-sub-3 p-[2.4rem] lg:w-[44%] lg:shrink-0">
      <h3 className="text-body-2 font-semibold text-gray-700">
        {month}월 {day}일
      </h3>
      <p className="mt-[0.8rem] text-body-3 text-gray-500">
        일정 {schedules.length}건
      </p>

      {isEmpty ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-body-3 text-gray-500">
            선택한 날짜에 등록된 일정이 없습니다.
          </p>
        </div>
      ) : (
        <ul className="mt-[2rem] flex flex-col gap-[1.2rem]">
          {schedules.map((schedule) => (
            <li
              key={schedule.id}
              className="flex items-center justify-between gap-[0.8rem] rounded-[1.2rem] bg-white p-[1.6rem]"
            >
              <span className="min-w-0 truncate text-body-3 font-medium text-gray-700">
                {schedule.title}
              </span>
              <span className="shrink-0 text-caption font-medium text-gray-500">
                {schedule.startLabel} ~ {schedule.endLabel}
              </span>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default ScheduleList;
