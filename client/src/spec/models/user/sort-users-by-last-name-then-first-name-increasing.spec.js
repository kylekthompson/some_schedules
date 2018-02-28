import sortUsersByLastNameThenFirstNameIncreasing from 'models/user/sort-users-by-last-name-then-first-name-increasing';
import { User } from 'spec/factories';

describe('sortUsersByLastNameThenFirstNameIncreasing()', () => {
  it('gets the correct users', () => {
    const user1 = new User({
      firstName: 'Bob',
      lastName: 'Bobson',
    });
    const user2 = new User({
      firstName: 'Carl',
      lastName: 'Bobson',
    });
    const user3 = new User({
      firstName: 'James',
      lastName: 'Jefferson',
    });

    expect(sortUsersByLastNameThenFirstNameIncreasing([user2, user3, user1])).toEqual([user1, user2, user3]);
  });
});
