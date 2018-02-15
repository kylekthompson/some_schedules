import differenceInMinutes from 'date-fns/difference_in_minutes';

import startOfMinute from 'models/time/startOfMinute';

const isSameMinute = (date, otherDate) => differenceInMinutes(startOfMinute(date), startOfMinute(otherDate)) === 0;

export default isSameMinute;
