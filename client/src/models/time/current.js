import Moment from 'moment-timezone';

const current = () => Moment.tz(Moment.tz.guess());

export default current;
