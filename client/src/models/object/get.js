function pathToArray(path) {
  if (Array.isArray(path)) {
    return path;
  }

  if (typeof path !== 'string') {
    throw new Error(`Invalid path: ${path}`);
  }

  return path
    .split(/[.[]]/)
    .filter(Boolean)
    .map((key) => {
      const parsed = parseInt(key, 10);

      if (parsed.toString() === key) {
        return parsed;
      }

      return key;
    });
}

export default function get(object, path, defaultValue = null) {
  const sanitizedPath = pathToArray(path);

  if (!object) {
    return defaultValue;
  }

  const retrievedValue = sanitizedPath.reduce((valueSoFar, key) => {
    if (valueSoFar === undefined || valueSoFar === null) {
      return valueSoFar;
    }

    return valueSoFar[key];
  }, object);

  return retrievedValue || defaultValue;
}
