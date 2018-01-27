const FORMATS = {
  HOURS_AND_PERIOD: 'ha',
  HOURS_MINUTES_AND_PERIOD: 'h:mma',
  MONTH_AND_YEAR: 'MMMM YYYY',
  SHORT_WEEKDAY_ONLY: 'ddd',
};

const forCalendar = (moment) => moment.format(FORMATS.MONTH_AND_YEAR);
const forSchedule = (moment) => {
  const format = moment.minutes() === 0 ? FORMATS.HOURS_AND_PERIOD : FORMATS.HOURS_MINUTES_AND_PERIOD;
  return moment.format(format);
};
const shortWeekdayOnly = (moment) => moment.format(FORMATS.SHORT_WEEKDAY_ONLY);

export default {
  forCalendar,
  forSchedule,
  shortWeekdayOnly,
};
