import { nameValidator, slugValidator } from 'models/validations/company';

describe('company validations', () => {
  describe('nameValidator.run()', () => {
    describe('when valid', () => {
      it('returns no errors', () => {
        expect(nameValidator.run({ name: 'Some Company' })).toHaveLength(0);
      });
    });

    describe('when invalid', () => {
      it('returns errors', () => {
        expect(nameValidator.run({ name: '' })).toHaveLength(1);
      });
    });
  });

  describe('slugValidator.run()', () => {
    describe('when valid', () => {
      it('returns no errors', () => {
        expect(slugValidator.run({ slug: 'some-company' })).toHaveLength(0);
      });
    });

    describe('when invalid', () => {
      it('returns errors', () => {
        expect(slugValidator.run({ slug: '!@#$%^&*' })).toHaveLength(1);
      });
    });
  });
});
