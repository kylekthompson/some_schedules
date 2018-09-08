export default function debounce(func, options = {}) {
  const date = options.date || Date;
  const timeoutMillis = options.timeoutMillis || 1000;

  if (typeof func !== 'function') {
    throw new Error(`Unable to debounce a non-function: ${func}`);
  }

  let lastCalledAt = null;
  let lastResult = null;

  function debounced(...args) {
    if (lastCalledAt === null || date.now() - lastCalledAt > timeoutMillis) {
      lastCalledAt = date.now();
      lastResult = func(...args);
    }

    return lastResult;
  }

  return debounced;
}
