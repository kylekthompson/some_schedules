import differenceInMinutes from 'date-fns/difference_in_minutes';
import startOfMinute from 'models/time/start-of-minute';

export default function isSameMinute(date, otherDate) {
  return (
    differenceInMinutes(startOfMinute(date), startOfMinute(otherDate)) === 0
  );
}
