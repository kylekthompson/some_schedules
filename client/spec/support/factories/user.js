import Company from 'spec/support/factories/company';
import Factory from 'spec/support/factories/factory';
import UserModel from 'models/user';

export default class User extends Factory {
  constructor(user = {}) {
    super({
      company: new Company(),
      email: 'email@example.com',
      firstName: 'Kyle',
      id: Math.floor(Math.random() * 100000000),
      lastName: 'Thompson',
      role: UserModel.Role.EMPLOYEE,
      ...user,
    });
  }
}
