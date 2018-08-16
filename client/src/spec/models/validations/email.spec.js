import { emailValidator } from 'models/validations/email';

describe('email validations', () => {
  describe('emailValidator.run()', () => {
    describe('when valid', () => {
      it('returns no errors', () => {
        expect(emailValidator.run({ email: 'email@email.com' })).toHaveLength(
          0,
        );
      });
    });

    describe('when invalid', () => {
      it('returns errors', () => {
        expect(emailValidator.run({ email: 'email@@email' })).toHaveLength(1);
      });
    });
  });
});
