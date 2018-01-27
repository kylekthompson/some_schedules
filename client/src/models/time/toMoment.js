import Moment from 'moment-timezone';

const toMoment = (time) => Moment.utc(time, 'YYYY-MM-DD HH-mm-ss UTC').tz(Moment.tz.guess());

export default toMoment;
