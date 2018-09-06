import Validation from 'models/validations/validation';

describe('Validation', () => {
  describe('run', () => {
    it('runs all of the validator functions', () => {
      const validators = [
        jest.fn(),
        jest.fn(),
        jest.fn(),
      ];

      new Validation(validators).run({});

      validators.forEach((validator) => expect(validator).toHaveBeenCalled());
    });

    it('only returns truthy results', () => {
      const validators = [
        () => false,
        () => null,
        () => 'error',
      ];

      const errors = new Validation(validators).run({});

      expect(errors).toEqual(['error']);
    });
  });
});
