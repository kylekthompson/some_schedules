import subtractMinutes from 'models/time/subtractMinutes';

const adjustForCurrentTimezone = (date) => {
  const offset = date.getTimezoneOffset();
  return subtractMinutes(date, offset);
};

export default adjustForCurrentTimezone;
