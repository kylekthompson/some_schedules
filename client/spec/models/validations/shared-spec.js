import { atLeastNCharacters, occurenceCount } from 'models/validations/shared';

describe('shared validations', () => {
  describe('atLeastNCharacters', () => {
    describe('a string with fewer than N characters', () => {
      it('has the error', () => {
        expect(atLeastNCharacters('123456789', 10)).toEqual('Looks like you need 1 more character');
      });
    });

    describe('a string with N characters', () => {
      it('is null', () => {
        expect(atLeastNCharacters('1234567890', 10)).toEqual(null);
      });
    });

    describe('a string with more than N characters', () => {
      it('is null', () => {
        expect(atLeastNCharacters('12345678901', 10)).toEqual(null);
      });
    });
  });

  describe('occurenceCount', () => {
    it('returns a count of the specified character', () => {
      expect(occurenceCount('1223334444', '1')).toEqual(1);
      expect(occurenceCount('1223334444', '2')).toEqual(2);
      expect(occurenceCount('1223334444', '3')).toEqual(3);
      expect(occurenceCount('1223334444', '4')).toEqual(4);
    });
  });
});
