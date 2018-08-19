export class Cache {
  static AUTHENTICATION_CONTEXT_KEY = 'some_schedules_authentication_context';
  static DEFAULT_AUTHENTICATION_CONTEXT = {
    isAdmin: false,
    isSignedIn: false,
    role: null,
  };

  constructor(storage = window.localStorage) {
    this.storage = storage;
  }

  clear = () => {
    return this.storage.removeItem(Cache.AUTHENTICATION_CONTEXT_KEY);
  }

  get = () => {
    const cache = this.storage.getItem(Cache.AUTHENTICATION_CONTEXT_KEY);

    if (cache) {
      return JSON.parse(cache);
    }

    return Cache.DEFAULT_AUTHENTICATION_CONTEXT;
  }

  set = (context) => {
    return this.storage.setItem(Cache.AUTHENTICATION_CONTEXT_KEY, JSON.stringify(context));
  }
}

export default new Cache();
