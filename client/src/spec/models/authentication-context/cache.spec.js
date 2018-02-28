import cache from 'models/authenticationContext/cache';
import constants from 'models/authenticationContext/constants';

describe('clear()', () => {
  let removeItem;

  beforeEach(() => {
    removeItem = jest.fn();
    global.localStorage.removeItem = removeItem;
  });

  it('deletes the cache at the correct key', () => {
    cache.clear();

    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith(constants.AUTHENTICATION_CONTEXT_KEY);
  });
});

describe('get()', () => {
  let getItem;

  beforeEach(() => {
    getItem = jest.fn();
    global.localStorage.getItem = getItem;
  });

  it('gets the cache at the correct key', () => {
    cache.get();

    expect(getItem).toHaveBeenCalledTimes(1);
    expect(getItem).toHaveBeenCalledWith(constants.AUTHENTICATION_CONTEXT_KEY);
  });
});

describe('set()', () => {
  let setItem;

  beforeEach(() => {
    setItem = jest.fn();
    global.localStorage.setItem = setItem;
  });

  it('sets the cache at the correct key', () => {
    cache.set({});

    expect(setItem).toHaveBeenCalledTimes(1);
    expect(setItem).toHaveBeenCalledWith(constants.AUTHENTICATION_CONTEXT_KEY, '{}');
  });
});
