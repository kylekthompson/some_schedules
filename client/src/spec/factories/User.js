import Factory from 'spec/factories/Factory';

class User extends Factory {
  email = 'kyle@kylekthompson.com';
  id = Math.floor(Math.random() * 100000000);
  firstName = 'Kyle';
  lastName = 'Thompson';
}

export default User;
