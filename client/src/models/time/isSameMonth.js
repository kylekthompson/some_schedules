import differenceInMonths from 'date-fns/difference_in_months';

import startOfMonth from 'models/time/startOfMonth';

const isSameMonth = (date, otherDate) => differenceInMonths(startOfMonth(date), startOfMonth(otherDate)) === 0;

export default isSameMonth;
