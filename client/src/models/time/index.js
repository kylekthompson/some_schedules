import Moment from 'moment-timezone';

const FORMATS = {
  HOURS_AND_PERIOD: 'ha',
  HOURS_MINUTES_AND_PERIOD: 'h:mma',
  MONTH_AND_YEAR: 'MMMM YYYY',
};

const current = () => Moment.tz(Moment.tz.guess());
const firstDayOfMonth = (moment) => moment.clone().startOf('month').startOf('week');
const lastMonth = (moment) => moment.clone().subtract(1, 'month');
const nextMonth = (moment) => moment.clone().add(1, 'month');
const toMoment = (time) => Moment.utc(time, 'YYYY-MM-DD HH-mm-ss UTC').tz(Moment.tz.guess());

const formatForCalendar = (moment) => moment.format(FORMATS.MONTH_AND_YEAR);
const formatForSchedule = (moment) => {
  if (moment.minutes() === 0) {
    return moment.format(FORMATS.HOURS_AND_PERIOD);
  }

  return moment.format(FORMATS.HOURS_MINUTES_AND_PERIOD);
};

export const DAYS_IN_WEEK = 7;
export const WEEKS_IN_CALENDAR = 6;
export default {
  current,
  firstDayOfMonth,
  formatForCalendar,
  formatForSchedule,
  lastMonth,
  nextMonth,
  toMoment,
};
