import moment from 'moment-timezone';

export const toMoment = (time) => moment.utc(time, 'YYYY-MM-DD HH-mm-ss UTC').tz(moment.tz.guess());
