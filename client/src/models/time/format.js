export const FORMATS = {
  HOURS_AND_PERIOD: 'ha',
  HOURS_MINUTES_AND_PERIOD: 'h:mma',
  MONTH_AND_YEAR: 'MMMM YYYY',
  SERVER: 'YYYY-MM-DD HH-mm-ss UTC',
  SHORT_WEEKDAY_ONLY: 'ddd',
};

const forCalendar = (moment) => moment.format(FORMATS.MONTH_AND_YEAR);
const forSchedule = (moment) => {
  const format = moment.minutes() === 0 ? FORMATS.HOURS_AND_PERIOD : FORMATS.HOURS_MINUTES_AND_PERIOD;
  return moment.format(format);
};
const forServer = (moment) => moment.toISOString();
const shortWeekdayOnly = (moment) => moment.format(FORMATS.SHORT_WEEKDAY_ONLY);

export default {
  forCalendar,
  forSchedule,
  forServer,
  shortWeekdayOnly,
};
