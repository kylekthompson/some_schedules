export class Cache {
  static USER_KEY = 'some_schedules_user';
  static DEFAULT_USER = null;

  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  clear = () => {
    return this.storage.removeItem(Cache.USER_KEY);
  }

  get = () => {
    const cache = this.storage.getItem(Cache.USER_KEY);

    if (cache) {
      return JSON.parse(cache);
    }

    return Cache.DEFAULT_USER;
  }

  set = (user) => {
    return this.storage.setItem(Cache.USER_KEY, JSON.stringify(user));
  }
}

export default new Cache();
