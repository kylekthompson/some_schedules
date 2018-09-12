import { nameValidation } from 'models/validations/company';

describe('nameValidation', () => {
  describe('a first name that is improperly formatted', () => {
    it('has the correct errors', () => {
      expect(nameValidation.run({
        name: '',
      })).toEqual(['Looks like you need 1 more character']);
    });
  });

  describe('a first name that is properly formatted', () => {
    it('has no errors', () => {
      expect(nameValidation.run({
        name: 'A',
      })).toEqual([]);
    });
  });
});
