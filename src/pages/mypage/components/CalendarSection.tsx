import { useState } from 'react';
import ScheduleCalendar from '@pages/mypage/components/calendar/ScheduleCalendar';
import ScheduleList from '@pages/mypage/components/calendar/ScheduleList';
import type { ScheduleItem } from '@pages/mypage/types';
import { toDateKey } from '@pages/mypage/utils/calendar';

type CalendarSectionProps = {
  schedules: ScheduleItem[];
  initialDate?: Date;
};

const CalendarSection = ({
  schedules,
  initialDate = new Date(),
}: CalendarSectionProps) => {
  const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const selectedSchedules = schedules.filter(
    (schedule) => schedule.date === toDateKey(selectedDate)
  );

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
      return;
    }
    setCurrentMonth((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
      return;
    }
    setCurrentMonth((prev) => prev + 1);
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setCurrentYear(date.getFullYear());
    setCurrentMonth(date.getMonth());
  };

  return (
    <section>
      <h2 className="mb-[2.8rem] text-heading-3 text-gray-800">캘린더</h2>
      <div className="flex flex-col gap-[4rem] bg-white lg:flex-row lg:items-stretch">
        <ScheduleCalendar
          year={currentYear}
          month={currentMonth}
          selectedDate={selectedDate}
          schedules={schedules}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onSelectDate={handleSelectDate}
        />
        <ScheduleList
          selectedDate={selectedDate}
          schedules={selectedSchedules}
        />
      </div>
    </section>
  );
};

export default CalendarSection;
