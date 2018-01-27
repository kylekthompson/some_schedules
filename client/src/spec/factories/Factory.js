export default class Factory {
  constructor(base = {}) {
    Object.keys(base).forEach((field) => {
      this[field] = base[field];
    });
  }
}
