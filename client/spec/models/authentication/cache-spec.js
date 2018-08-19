import { Cache } from 'src/models/authentication/cache';

function buildStorage() {
  const store = {};
  return {
    getItem: (key) => store[key],
    removeItem: (key) => {
      const value = store[key];
      delete store[key];
      return value;
    },
    setItem: (key, value) => store[key] = value,
  };
}

describe('Cache', () => {
  describe('.get', () => {
    describe('when the cache is empty', () => {
      it('returns the default cache', () => {
        const storage = buildStorage();
        const cache = new Cache(storage);

        expect(storage.getItem(Cache.AUTHENTICATION_CONTEXT_KEY)).toEqual(undefined);
        expect(cache.get()).toEqual(Cache.DEFAULT_AUTHENTICATION_CONTEXT);
      });
    });

    describe('when the cache is not empty', () => {
      it('returns the existing value', () => {
        const storage = buildStorage();
        const cache = new Cache(storage);

        storage.setItem(Cache.AUTHENTICATION_CONTEXT_KEY, JSON.stringify({
          foo: 'bar',
        }));

        expect(cache.get()).toEqual({
          foo: 'bar',
        });
      });
    });
  });

  describe('.set', () => {
    describe('when the cache is empty', () => {
      it('sets the cache to the right value', () => {
        const storage = buildStorage();
        const cache = new Cache(storage);

        expect(storage.getItem(Cache.AUTHENTICATION_CONTEXT_KEY)).toEqual(undefined);

        cache.set({
          foo: 'bar',
        });

        expect(storage.getItem(Cache.AUTHENTICATION_CONTEXT_KEY)).toEqual(JSON.stringify({
          foo: 'bar',
        }));
      });
    });

    describe('when the cache is not empty', () => {
      it('updates the value', () => {
        const storage = buildStorage();
        const cache = new Cache(storage);

        storage.setItem(Cache.AUTHENTICATION_CONTEXT_KEY, JSON.stringify({
          foo: 'bar',
        }));

        cache.set({
          foo: 'baz',
        });

        expect(storage.getItem(Cache.AUTHENTICATION_CONTEXT_KEY)).toEqual(JSON.stringify({
          foo: 'baz',
        }));
      });
    });
  });

  describe('.clear', () => {
    describe('when the cache is empty', () => {
      it('stays empty', () => {
        const storage = buildStorage();
        const cache = new Cache(storage);

        expect(storage.getItem(Cache.AUTHENTICATION_CONTEXT_KEY)).toEqual(undefined);

        cache.clear();

        expect(storage.getItem(Cache.AUTHENTICATION_CONTEXT_KEY)).toEqual(undefined);
      });
    });

    describe('when the cache is not empty', () => {
      it('empties it', () => {
        const storage = buildStorage();
        const cache = new Cache(storage);

        storage.setItem(Cache.AUTHENTICATION_CONTEXT_KEY, JSON.stringify({
          foo: 'bar',
        }));

        cache.clear();

        expect(storage.getItem(Cache.AUTHENTICATION_CONTEXT_KEY)).toEqual(undefined);
      });
    });
  });
});
