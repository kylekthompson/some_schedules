export default function pluralize(count, string, pluralization = null) {
  if (count === 1) {
    return string;
  }

  return pluralization || `${string}s`;
}
