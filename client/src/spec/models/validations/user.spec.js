import { firstNameValidator, lastNameValidator } from 'models/validations/user';

describe('company validations', () => {
  describe('firstNameValidator.run()', () => {
    describe('when valid', () => {
      it('returns no errors', () => {
        expect(firstNameValidator.run({ firstName: 'Name' })).toHaveLength(0);
      });
    });

    describe('when invalid', () => {
      it('returns errors', () => {
        expect(firstNameValidator.run({ firstName: '' })).toHaveLength(1);
      });
    });
  });

  describe('lastNameValidator.run()', () => {
    describe('when valid', () => {
      it('returns no errors', () => {
        expect(lastNameValidator.run({ lastName: 'Last' })).toHaveLength(0);
      });
    });

    describe('when invalid', () => {
      it('returns errors', () => {
        expect(lastNameValidator.run({ lastName: '' })).toHaveLength(1);
      });
    });
  });
});
