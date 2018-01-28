import constants from 'models/authentication/constants';
import deleteToken from 'models/authentication/deleteToken';

describe('deleteToken()', () => {
  let removeItem;

  beforeEach(() => {
    removeItem = jest.fn();
    global.localStorage.removeItem = removeItem;
  });

  it('deletes the token at the correct key', () => {
    deleteToken();

    expect(removeItem).toHaveBeenCalledTimes(1);
    expect(removeItem).toHaveBeenCalledWith(constants.TOKEN_KEY);
  });
});
