import findUser from 'models/viewer/findUser';
import { Company, User } from 'spec/factories';

describe('findUser()', () => {
  it('finds the correct user', () => {
    const viewer = new User();
    const company = new Company().withUsers([{ id: 111 }], 2);
    const expectedUser = company.users[0];
    company.users.push(viewer);
    viewer.company = company;

    expect(findUser(viewer, 111)).toEqual(expectedUser);
  });
});
