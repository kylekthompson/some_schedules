import constants from 'models/authentication-context/constants';

let cache = null;

const clear = jest.fn(() => (cache = null));
const get = jest.fn(() => cache || constants.DEFAULT_CONTEXT);
const set = jest.fn((context) => (cache = context));

const _reset = () => {
  cache = null;
  clear.mockClear();
  get.mockClear();
  set.mockClear();
};

export default {
  _reset,
  clear,
  get,
  set,
};
