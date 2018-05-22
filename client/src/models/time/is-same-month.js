import differenceInMonths from 'date-fns/difference_in_months';
import startOfMonth from 'models/time/start-of-month';

export default function isSameMonth(date, otherDate) {
  return differenceInMonths(startOfMonth(date), startOfMonth(otherDate)) === 0;
}
