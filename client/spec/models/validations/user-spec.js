import { firstNameValidation, lastNameValidation } from 'models/validations/user';

describe('user validations', () => {
  describe('firstNameValidation', () => {
    describe('a first name that is improperly formatted', () => {
      it('has the correct errors', () => {
        expect(firstNameValidation.run({
          firstName: '',
        })).toEqual(['Looks like you need 1 more character']);
      });
    });

    describe('a first name that is properly formatted', () => {
      it('has no errors', () => {
        expect(firstNameValidation.run({
          firstName: 'A',
        })).toEqual([]);
      });
    });
  });

  describe('lastNameValidation', () => {
    describe('a last name that is improperly formatted', () => {
      it('has the correct errors', () => {
        expect(lastNameValidation.run({
          lastName: '',
        })).toEqual(['Looks like you need 1 more character']);
      });
    });

    describe('a last name that is properly formatted', () => {
      it('has no errors', () => {
        expect(lastNameValidation.run({
          lastName: 'A',
        })).toEqual([]);
      });
    });
  });
});
