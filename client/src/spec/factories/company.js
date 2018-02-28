import { ofSize } from 'models/array';
import Factory from 'spec/factories/factory';
import User from 'spec/factories/user';

class Company extends Factory {
  constructor(company = {}) {
    super({
      name: 'Company',
      id: Math.floor(Math.random() * 100000000),
      slug: `company-${Math.floor(Math.random() * 100000000)}`,
      ...company,
    });
  }

  withUsers(users = [], userCount = 1) {
    this.users = ofSize(userCount).map((index) => new User(users[index] || {}).withShifts());
    this.shifts = [].concat(...this.users.map((u) => u.shifts));
    return this;
  }
}

export default Company;
