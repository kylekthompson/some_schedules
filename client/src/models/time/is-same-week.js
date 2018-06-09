import differenceInWeeks from 'date-fns/difference_in_weeks';
import startOfWeek from 'models/time/start-of-week';

export default function isSameWeek(date, otherDate) {
  return differenceInWeeks(startOfWeek(date), startOfWeek(otherDate)) === 0;
}
