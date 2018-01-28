import constants from 'models/authentication/constants';
import setToken from 'models/authentication/setToken';

describe('setToken()', () => {
  let setItem;

  beforeEach(() => {
    setItem = jest.fn();
    global.localStorage.setItem = setItem;
  });

  it('gets the token from the correct key', () => {
    setToken('token');

    expect(setItem).toHaveBeenCalledTimes(1);
    expect(setItem).toHaveBeenCalledWith(constants.TOKEN_KEY, 'token');
  });
});
