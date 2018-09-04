import LocalStorage from './mocks/browser/local-storage';

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorage(),
});
