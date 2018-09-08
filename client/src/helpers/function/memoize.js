export default function memoize(func) {
  if (typeof func !== 'function') {
    throw new Error(`Unable to memoize a non-function: ${func}`);
  }

  const cache = {};

  function memoized(...args) {
    const key = args[0];

    if (key in cache) {
      return cache[key];
    }

    const result = func(...args);
    cache[key] = result;
    return result;
  }

  return memoized;
}
