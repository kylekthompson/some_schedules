export default class LocalStorage {
  constructor(store = {}) {
    this.store = store;
  }

  getItem(key) {
    return this.store[key];
  }

  removeItem(key) {
    const value = this.store[key];
    delete this.store[key];
    return value;
  }

  setItem(key, value) {
    return this.store[key] = value;
  }
}
