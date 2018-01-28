import constants from 'models/authentication/constants';
import isSignedIn from 'models/authentication/isSignedIn';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTgzNzg4NTMsInN1YiI6Imt5bGVAa3lsZWt0aG9tcHNvbi5jb20iLCJ1aWQiOjF9.UpGlk94cvpDhgoIOuwuBsuCm7q_cg_bBRwmo_wxR_i8';
const dateBeforeExp = 1500000000;
const dateAfterExp =  1600000000;

describe('isSignedIn()', () => {
  let getItem;

  describe('when the token is not set', () => {
    beforeEach(() => {
      getItem = jest.fn().mockReturnValue(null);
      global.localStorage.getItem = getItem;
    });

    it('returns false', () => {
      expect(isSignedIn()).toEqual(false);
    });
  });

  describe('when the token is set', () => {
    beforeEach(() => {
      getItem = jest.fn().mockReturnValue(token);
      global.localStorage.getItem = getItem;
    });

    describe('and the current date is before the token expiration', () => {
      it('returns true', () => {
        expect(isSignedIn(dateBeforeExp)).toEqual(true);
      });
    });

    describe('and the current date is after the token expiration', () => {
      it('returns false', () => {
        expect(isSignedIn(dateAfterExp)).toEqual(false);
      });
    });
  });
});
