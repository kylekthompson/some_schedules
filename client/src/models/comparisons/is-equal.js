export default function isEqual(left, right, { deep = false } = {}) {
  if (typeof left !== typeof right) {
    return false;
  }

  if (Number.isNaN(left) && Number.isNaN(right)) {
    return true;
  }

  const isFunction = typeof left === 'function';
  const isNumber = typeof left === 'number';
  const isString = typeof left === 'string';

  if (isFunction || isString || isNumber || !deep) {
    return left === right;
  }

  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);

  if (leftEntries.length !== rightEntries.length) {
    return false;
  }

  leftEntries.forEach(([key, value]) => {
    if (!isEqual(value, right[key], deep)) {
      return false;
    }
  });

  return true;
}
