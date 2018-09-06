import { emailValidation } from 'models/validations/email';

describe('emailValidation', () => {
  describe('a properly formatted email', () => {
    it('has no errors', () => {
      expect(emailValidation.run({ email: 'email@example.com' })).toEqual([]);
    });
  });

  describe('an improperly formatted email', () => {
    it('has the correct errors', () => {
      expect(emailValidation.run({ email: 'not-an-email' })).toEqual(['Make sure you\'re using a valid email!']);
    });
  });
});
