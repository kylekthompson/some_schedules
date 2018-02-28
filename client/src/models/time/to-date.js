import parse from 'date-fns/parse';

import adjustForCurrentTimezone from 'models/time/adjustForCurrentTimezone';

const toDate = (dateString) => adjustForCurrentTimezone(parse(dateString));

export default toDate;
