const pluralize = (count, string, pluralization) => {
  if (count === 1) {
    return string;
  }

  if (pluralization) {
    return pluralization;
  }

  return `${string}s`;
};

export default pluralize;
