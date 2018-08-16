import {
  passwordValidator,
  passwordConfirmationValidator,
} from 'models/validations/password';

describe('password validations', () => {
  describe('passwordValidator.run()', () => {
    describe('when valid', () => {
      it('returns no errors', () => {
        expect(passwordValidator.run({ password: 'password' })).toHaveLength(0);
      });
    });

    describe('when invalid', () => {
      it('returns errors', () => {
        expect(passwordValidator.run({ password: 'pass' })).toHaveLength(1);
      });
    });
  });

  describe('passwordConfirmationValidator.run()', () => {
    describe('when it matches and is long enough', () => {
      it('returns no errors', () => {
        expect(
          passwordConfirmationValidator.run({
            password: 'password',
            passwordConfirmation: 'password',
          }),
        ).toHaveLength(0);
      });
    });

    describe('when it matches and is not long enough', () => {
      it('returns no errors', () => {
        expect(
          passwordConfirmationValidator.run({
            password: 'pass',
            passwordConfirmation: 'pass',
          }),
        ).toHaveLength(1);
      });
    });

    describe('when it does not match and is not long enough', () => {
      it('returns no errors', () => {
        expect(
          passwordConfirmationValidator.run({
            password: 'pass1',
            passwordConfirmation: 'pass',
          }),
        ).toHaveLength(2);
      });
    });
  });
});
