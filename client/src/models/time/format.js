import getMinutes from 'date-fns/get_minutes';
import format from 'date-fns/format';

export const FORMATS = {
  DATE_ONLY: 'D',
  DAY_OF_WEEK_WITH_MONTH_AND_DATE: 'ddd, MMM Do',
  HOURS_AND_PERIOD: 'ha',
  HOURS_MINUTES_AND_PERIOD: 'h:mma',
  MONTH_AND_YEAR: 'MMMM YYYY',
  SERVER: 'YYYY-MM-DD HH-mm-ss UTC',
  SHORT_WEEKDAY_ONLY: 'ddd',
};

const dateOnly = (date) => format(date, FORMATS.DATE_ONLY);
const forCalendar = (date) => format(date, FORMATS.MONTH_AND_YEAR);
const forSchedule = (date) => {
  const formatString = getMinutes(date) === 0 ? FORMATS.HOURS_AND_PERIOD : FORMATS.HOURS_MINUTES_AND_PERIOD;
  return format(date, formatString);
};
const forServer = (date) => date.toISOString();
const forTimeInput = (date) => format(date, FORMATS.DAY_OF_WEEK_WITH_MONTH_AND_DATE);
const fromServer = (date) => format(date, FORMATS.SERVER);
const shortWeekdayOnly = (date) => format(date, FORMATS.SHORT_WEEKDAY_ONLY);

export default {
  dateOnly,
  forCalendar,
  forSchedule,
  forServer,
  forTimeInput,
  fromServer,
  shortWeekdayOnly,
};
