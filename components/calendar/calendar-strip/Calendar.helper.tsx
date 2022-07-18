import moment, { Moment } from 'moment';

const getBaseWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  const baseDay = currentDate.isValid() ? currentDate : moment().startOf('day');
  const weekdaySelected = baseDay.weekday();

  const baseDayWeekStart = baseDay.clone().subtract(weekdaySelected, 'day');

  [...Array(7).keys()].forEach(i => {
    const newDay = moment(baseDayWeekStart).add(i, 'day');
    days.push(newDay);
  });

  return days;
};
export const prevWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  [...Array(7).keys()].forEach(i => {
    const newDay = moment(currentDate).subtract(i + 1, 'day');
    days.push(newDay);
  });
  return days.sort((a, b) => a.diff(b));
};
export const nextWeekDays = (currentDate: Moment): Moment[] => {
  const days: Moment[] = [];
  [...Array(7).keys()].forEach(i => {
    const newDay = moment(currentDate).add(i + 1, 'day');
    days.push(newDay);
  });
  return days.sort((a, b) => a.diff(b));
};

export const renderedDays = (currentDate: Moment): Moment[] => {
  const baseDays = getBaseWeekDays(currentDate);
  const prevDays = prevWeekDays(baseDays[0]);
  const nextDays = nextWeekDays(baseDays[6]);
  return [...prevDays, ...baseDays, ...nextDays];
};

export function toMomentDate(date: string | Date | Moment): Moment {
  if (typeof date === 'string') {
    return moment(date).startOf('day');
  }
  if (date instanceof Date) {
    return moment(date).startOf('day');
  }
  return date.startOf('day');
}
