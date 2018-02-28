import subtractMinutes from 'models/time/subtract-minutes';

const adjustForCurrentTimezone = (date) => {
  const offset = date.getTimezoneOffset();
  return subtractMinutes(date, offset);
};

export default adjustForCurrentTimezone;
