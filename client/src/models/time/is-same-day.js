import differenceInDays from 'date-fns/difference_in_days';
import startOfDay from 'models/time/start-of-day';

export default function isSameDay(date, otherDate) {
  return differenceInDays(startOfDay(date), startOfDay(otherDate)) === 0;
}
