export const hasCharacters = (value) => {
  if (value.length >= 1) { return null; }
  return 'Looks like you missed a field!';
};
