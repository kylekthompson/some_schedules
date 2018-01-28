import constants from 'models/authentication/constants';
import getToken from 'models/authentication/getToken';

describe('getToken()', () => {
  let getItem;

  beforeEach(() => {
    getItem = jest.fn();
    global.localStorage.getItem = getItem;
  });

  it('gets the token from the correct key', () => {
    getToken();

    expect(getItem).toHaveBeenCalledTimes(1);
    expect(getItem).toHaveBeenCalledWith(constants.TOKEN_KEY);
  });
});
