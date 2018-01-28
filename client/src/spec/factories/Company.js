import { ofSize } from 'models/array';
import Factory from 'spec/factories/Factory';
import User from 'spec/factories/User';

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
    this.users = ofSize(userCount).map((index) => new User(users[index] || {}));
    return this;
  }
}

export default Company;
