import Moment from 'moment-timezone';

import { FORMATS } from 'models/time/format';
import Factory from 'spec/factories/Factory';
import User from 'spec/factories/User';

class Shift extends Factory {
  constructor(shift = {}) {
    super({
      endTime: Moment([2018, 11, 25]).format(FORMATS.SERVER),
      id: Math.floor(Math.random() * 100000000),
      published: true,
      startTime: Moment([2018, 11, 25]).format(FORMATS.SERVER),
      user: new User(),
      ...shift,
    });
  }
}

export default Shift;
