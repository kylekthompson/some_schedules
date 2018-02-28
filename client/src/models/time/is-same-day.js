import differenceInDays from 'date-fns/difference_in_days';

import startOfDay from 'models/time/start-of-day';

const isSameDay = (date, otherDate) => differenceInDays(startOfDay(date), startOfDay(otherDate)) === 0;

export default isSameDay;
