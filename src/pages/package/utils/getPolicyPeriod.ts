type ApplicationType = 'PERIOD' | 'ALWAYS' | 'UNKNOWN';

export const getDDay = (
  applicationEndDate: string | null,
  applicationType: ApplicationType
): number | null => {
  if (applicationType === 'ALWAYS' || !applicationEndDate) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(applicationEndDate);
  end.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffDays >= 0 ? diffDays : null;
};

const formatDate = (value: string) => value.replaceAll('-', '.');

export const formatPolicyPeriod = (
  applicationStartDate: string | null,
  applicationEndDate: string | null,
  applicationType: ApplicationType
): string => {
  if (applicationType === 'ALWAYS') return '상시모집';
  if (!applicationStartDate && !applicationEndDate) return '기간 미정';
  if (!applicationStartDate) return `~ ${formatDate(applicationEndDate!)}`;
  if (!applicationEndDate) return `${formatDate(applicationStartDate)} ~`;

  return `${formatDate(applicationStartDate)} ~ ${formatDate(applicationEndDate)}`;
};
