import { format } from 'models/time';
import Factory from 'spec/factories/Factory';
import User from 'spec/factories/User';

class Shift extends Factory {
  constructor(shift = {}) {
    super({
      endTime: format.fromServer(new Date(Date.UTC(2018, 11, 25))),
      id: Math.floor(Math.random() * 100000000),
      published: true,
      startTime: format.fromServer(new Date(Date.UTC(2018, 11, 25))),
      user: new User(),
      ...shift,
    });
  }
}

export default Shift;
