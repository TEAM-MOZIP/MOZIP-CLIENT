import type { ScheduleItem, ScheduleStatus } from '@pages/mypage/types';
import {
  WEEKDAYS,
  STATUS_LEGEND,
  STATUS_DOT_CLASS,
  toDateKey,
  isSameDay,
  getMonthMatrix,
} from '@pages/mypage/utils/calendar';
import leftChevron from '@shared/assets/icons/left-chevron.svg';
import rightChevron from '@shared/assets/icons/right-chevron.svg';

type ScheduleCalendarProps = {
  year: number;
  month: number;
  selectedDate: Date;
  schedules: ScheduleItem[];
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onSelectDate: (date: Date) => void;
};

const getDayTextClass = (weekday: number) => {
  if (weekday === 0) return 'text-point';
  if (weekday === 6) return 'text-blue';
  return 'text-title';
};

const ScheduleCalendar = ({
  year,
  month,
  selectedDate,
  schedules,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
}: ScheduleCalendarProps) => {
  const weeks = getMonthMatrix(year, month);

  const statusByDate = schedules.reduce<Record<string, ScheduleStatus>>(
    (dateStatus, schedule) => {
      dateStatus[schedule.date] = schedule.status;
      return dateStatus;
    },
    {}
  );

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <div className="mb-[3.2rem] flex items-center justify-center gap-[1.6rem]">
        <button
          type="button"
          aria-label="이전 달"
          onClick={onPrevMonth}
          className="flex size-[2rem] cursor-pointer items-center justify-center"
        >
          <img src={leftChevron} alt="" aria-hidden className="size-[1.8rem]" />
        </button>
        <h3 className="text-body-1 font-semibold text-gray-700">
          {year}년 {month + 1}월
        </h3>
        <button
          type="button"
          aria-label="다음 달"
          onClick={onNextMonth}
          className="flex size-[2rem] cursor-pointer items-center justify-center"
        >
          <img
            src={rightChevron}
            alt=""
            aria-hidden
            className="size-[1.8rem]"
          />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-[2rem]">
        {WEEKDAYS.map((day, index) => (
          <div
            key={day}
            className={`text-center text-body-2 font-medium ${getDayTextClass(index)}`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[1.2rem]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7">
            {week.map((date, dayIndex) => {
              if (!date) {
                return <div key={`empty-${weekIndex}-${dayIndex}`} />;
              }

              const selected = isSameDay(date, selectedDate);
              const status = statusByDate[toDateKey(date)];
              const weekday = date.getDay();

              return (
                <button
                  key={toDateKey(date)}
                  type="button"
                  onClick={() => onSelectDate(date)}
                  className="flex cursor-pointer flex-col items-center gap-[0.4rem]"
                >
                  <span
                    className={[
                      'flex size-[3.6rem] items-center justify-center rounded-[0.8rem] text-body-2 font-medium transition-colors',
                      selected ? 'bg-primary-sub-1' : 'hover:bg-primary-sub-2',
                      getDayTextClass(weekday),
                    ].join(' ')}
                  >
                    {date.getDate()}
                  </span>

                  <span className="flex h-0.6rem items-center justify-center">
                    {status && (
                      <span
                        className={`size-[0.6rem] rounded-full ${STATUS_DOT_CLASS[status]}`}
                        aria-hidden
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <ul className="mt-[2.8rem] flex flex-wrap items-center justify-center gap-[2.8rem]">
        {STATUS_LEGEND.map((item) => (
          <li
            key={item.status}
            className="flex items-center gap-[0.8rem] text-caption text-gray-700"
          >
            <span
              className={`size-[1rem] rounded-full ${item.colorClass}`}
              aria-hidden
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleCalendar;
