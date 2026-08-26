import type { ScheduleStatus } from '@pages/mypage/types';

export const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'] as const;

export const STATUS_LEGEND: {
  status: ScheduleStatus;
  label: string;
  colorClass: string;
}[] = [
  { status: 'scheduled', label: '예정', colorClass: 'bg-blue-500' },
  { status: 'open', label: '접수 중', colorClass: 'bg-green-500' },
  { status: 'closing', label: '마감 임박', colorClass: 'bg-red-500' },
  { status: 'closed', label: '마감', colorClass: 'bg-gray-500' },
];

export const STATUS_DOT_CLASS: Record<ScheduleStatus, string> = {
  scheduled: 'bg-blue-500',
  open: 'bg-green-500',
  closing: 'bg-red-500',
  closed: 'bg-gray-400',
};

export const toDateKey = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const getMonthMatrix = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];

  for (let i = 0; i < startWeekday; i++) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  const weeks: (Date | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return weeks;
};
