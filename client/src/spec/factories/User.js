import Factory from 'spec/factories/Factory';

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
}

export default User;
