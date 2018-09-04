import { pluralize } from 'helpers/string';

export function occurenceCount(string, character) {
  return string.split('').filter((char) => char === character).length;
}

export function atLeastNCharacters(string, minimumCharacterCount) {
  if (string.length >= minimumCharacterCount) {
    return null;
  }

  const missingCount = minimumCharacterCount - string.length;
  return `Looks like you need ${missingCount} more ${pluralize(missingCount, 'character')}`;
}
