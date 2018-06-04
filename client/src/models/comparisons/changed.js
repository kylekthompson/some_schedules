import isEqual from 'models/comparisons/is-equal';
import { get } from 'models/object';

export default function changed(
  prevProps,
  currentProps,
  path,
  { deep = false } = {},
) {
  if (typeof path === 'function') {
    return !isEqual(path(prevProps), path(currentProps), { deep });
  }

  return !isEqual(get(prevProps, path), get(currentProps, path), { deep });
}
