import { passwordConfirmationValidation, passwordValidation } from 'models/validations/password';

describe('password validations', () => {
  describe('passwordConfirmationValidation', () => {
    describe('a properly formatted password with a matching confirmation', () => {
      it('has no errors', () => {
        expect(passwordConfirmationValidation.run({
          password: 'password',
          passwordConfirmation: 'password',
        })).toEqual([]);
      });
    });

    describe('a password that is improperly formatted', () => {
      it('has the correct errors', () => {
        expect(passwordConfirmationValidation.run({
          password: 'password',
          passwordConfirmation: 'pass',
        })).toEqual(['Looks like you need 4 more characters', 'Make sure this matches your password!']);
      });
    });

    describe('a password that does not match', () => {
      it('has the correct errors', () => {
        expect(passwordConfirmationValidation.run({
          password: 'password',
          passwordConfirmation: 'password1',
        })).toEqual(['Make sure this matches your password!']);
      });
    });
  });

  describe('passwordValidation', () => {
    describe('a properly formatted password', () => {
      it('has no errors', () => {
        expect(passwordValidation.run({ password: 'password' })).toEqual([]);
      });
    });

    describe('an improperly formatted password', () => {
      it('has the correct errors', () => {
        expect(passwordValidation.run({ password: 'pass' })).toEqual(['Looks like you need 4 more characters']);
      });
    });
  });
});
