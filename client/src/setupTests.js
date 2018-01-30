import { configure } from 'enzyme'; // eslint-disable-line import/no-extraneous-dependencies
import Adapter from 'enzyme-adapter-react-16'; // eslint-disable-line import/no-extraneous-dependencies

configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;
