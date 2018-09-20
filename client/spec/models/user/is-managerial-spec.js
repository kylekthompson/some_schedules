import isManagerial from 'models/user/is-managerial';
import roles from 'models/user/roles';
import { User } from 'spec/support/factories';

describe('isManagerial', () => {
  describe('when the role of the user is owner', () => {
    it('is managerial', () => {
      expect(isManagerial(new User({ role: roles.OWNER }))).toEqual(true);
    });
  });

  describe('when the role of the user is manager', () => {
    it('is managerial', () => {
      expect(isManagerial(new User({ role: roles.MANAGER }))).toEqual(true);
    });
  });

  describe('when the role of the user is employee', () => {
    it('is not managerial', () => {
      expect(isManagerial(new User({ role: roles.EMPLOYEE }))).toEqual(false);
    });
  });
});
