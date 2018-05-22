import format from 'date-fns/format';
import getMinutes from 'date-fns/get_minutes';

export const FORMATS = {
  DATE_ONLY: 'D',
  DAY_OF_WEEK_WITH_MONTH_AND_DATE: 'ddd, MMM Do',
  HOURS_AND_PERIOD: 'ha',
  HOURS_MINUTES_AND_PERIOD: 'h:mma',
  MONTH_AND_YEAR: 'MMMM YYYY',
  SERVER: 'YYYY-MM-DD HH-mm-ss UTC',
  SHORT_WEEKDAY_ONLY: 'ddd',
};

function dateOnly(date) {
  return format(date, FORMATS.DATE_ONLY);
}

function forCalendar(date) {
  return format(date, FORMATS.MONTH_AND_YEAR);
}

function forSchedule(date) {
  const formatString =
    getMinutes(date) === 0
      ? FORMATS.HOURS_AND_PERIOD
      : FORMATS.HOURS_MINUTES_AND_PERIOD;
  return format(date, formatString);
}

function forServer(date) {
  return date.toISOString();
}

function forTimeInput(date) {
  return format(date, FORMATS.DAY_OF_WEEK_WITH_MONTH_AND_DATE);
}

function fromServer(date) {
  return format(date, FORMATS.SERVER);
}

function shortWeekdayOnly(date) {
  return format(date, FORMATS.SHORT_WEEKDAY_ONLY);
}

export default {
  dateOnly,
  forCalendar,
  forSchedule,
  forServer,
  forTimeInput,
  fromServer,
  shortWeekdayOnly,
};
