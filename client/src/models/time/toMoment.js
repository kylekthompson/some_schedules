import Moment from 'moment-timezone';

import { FORMATS } from 'models/time/format';

const toMoment = (time) => Moment.utc(time, FORMATS.SERVER).tz(Moment.tz.guess());

export default toMoment;
