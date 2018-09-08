import debounce from 'helpers/function/debounce';

describe('debounce', () => {
  describe('default timeout', () => {
    it('only calls the function again after 1000 milliseconds', () => {
      let now = 0;
      const date = {
        now: () => now,
      };
      const originalFunction = jest.fn();
      const debounced = debounce(originalFunction, {
        date,
      });

      debounced();
      debounced();
      debounced();

      expect(originalFunction).toHaveBeenCalledTimes(1);

      now = 1000;

      debounced();
      debounced();
      debounced();

      expect(originalFunction).toHaveBeenCalledTimes(1);

      now = 1001;

      debounced();
      debounced();
      debounced();

      expect(originalFunction).toHaveBeenCalledTimes(2);
    });
  });

  describe('custom timeouts', () => {
    it('only calls the function again after the specified milliseconds', () => {
      let now = 0;
      const date = {
        now: () => now,
      };
      const originalFunction = jest.fn();
      const debounced = debounce(originalFunction, {
        date,
        timeoutMillis: 500,
      });

      debounced();
      debounced();
      debounced();

      expect(originalFunction).toHaveBeenCalledTimes(1);

      now = 500;

      debounced();
      debounced();
      debounced();

      expect(originalFunction).toHaveBeenCalledTimes(1);

      now = 501;

      debounced();
      debounced();
      debounced();

      expect(originalFunction).toHaveBeenCalledTimes(2);
    });
  });
});
