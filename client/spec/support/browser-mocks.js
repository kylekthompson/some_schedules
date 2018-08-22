import LocalStorage from 'spec/support/mocks/browser/local-storage';

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorage(),
});
