import LocalStorage from 'spec/support/mocks/browser/local-storage';
import { Cache } from 'models/authentication/cache';

describe('Cache', () => {
  describe('.get', () => {
    describe('when the cache is empty', () => {
      it('returns the default cache', () => {
        const cache = new Cache(new LocalStorage());

        expect(cache.get()).toEqual(Cache.DEFAULT_USER);
      });
    });

    describe('when the cache is not empty', () => {
      it('returns the existing value', () => {
        const storage = new LocalStorage({
          [Cache.USER_KEY]: JSON.stringify({
            foo: 'bar',
          }),
        });

        const cache = new Cache(storage);

        expect(cache.get()).toEqual({
          foo: 'bar',
        });
      });
    });
  });

  describe('.set', () => {
    describe('when the cache is empty', () => {
      it('sets the cache to the right value', () => {
        const storage = new LocalStorage();
        const cache = new Cache(storage);

        cache.set({
          foo: 'bar',
        });

        expect(storage.store[Cache.USER_KEY]).toEqual(JSON.stringify({
          foo: 'bar',
        }));
      });
    });

    describe('when the cache is not empty', () => {
      it('updates the value', () => {
        const storage = new LocalStorage({
          [Cache.USER_KEY]: JSON.stringify({
            foo: 'bar',
          }),
        });

        const cache = new Cache(storage);

        cache.set({
          foo: 'baz',
        });

        expect(storage.store[Cache.USER_KEY]).toEqual(JSON.stringify({
          foo: 'baz',
        }));
      });
    });
  });

  describe('.clear', () => {
    describe('when the cache is empty', () => {
      it('stays empty', () => {
        const storage = new LocalStorage();
        const cache = new Cache(storage);

        cache.clear();

        expect(storage.store[Cache.USER_KEY]).toEqual(undefined);
      });
    });

    describe('when the cache is not empty', () => {
      it('empties it', () => {
        const storage = new LocalStorage({
          [Cache.USER_KEY]: JSON.stringify({
            foo: 'bar',
          }),
        });

        const cache = new Cache(storage);

        cache.clear();

        expect(storage.store[Cache.USER_KEY]).toEqual(undefined);
      });
    });
  });
});
