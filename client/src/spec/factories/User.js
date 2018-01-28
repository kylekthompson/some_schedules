import { ofSize } from 'models/array';
import Company from 'spec/factories/Company';
import Factory from 'spec/factories/Factory';
import Shift from 'spec/factories/Shift';

class User extends Factory {
  constructor(user = {}) {
    super({
      email: 'kyle@kylekthompson.com',
      id: Math.floor(Math.random() * 100000000),
      firstName: 'Kyle',
      lastName: 'Thompson',
      ...user,
    });
  }

  withCompany(company = {}) {
    this.company = new Company(company);
    return this;
  }

  withShifts(shifts = [], shiftCount = 1) {
    this.shifts = ofSize(shiftCount).map((index) => new Shift(shifts[index] || {}));
    return this;
  }
}

export default User;
