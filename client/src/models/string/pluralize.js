export default function pluralize(count, string, pluralization) {
  if (count === 1) {
    return string;
  }

  if (pluralization) {
    return pluralization;
  }

  return `${string}s`;
}
