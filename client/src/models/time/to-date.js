import parse from 'date-fns/parse';

import adjustForCurrentTimezone from 'models/time/adjust-for-current-timezone';

const toDate = (dateString) => adjustForCurrentTimezone(parse(dateString));

export default toDate;
