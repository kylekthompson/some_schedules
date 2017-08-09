export const checkIfEmailIsAvailable = (value: string): Promise<string[]> => (
  new Promise<string[]>((resolve) => setTimeout(() => {
    if (value && value.length > 10) {
      resolve(['Email taken.']);
    } else {
      resolve([]);
    }
  }, 1000))
);

export const validateEmailFormat = (value: string): string[] => (
  /.+@.+\..+/.exec(value)
    ? []
    : ['Must be a valid email address.']
);

export const validateHasCharacters = (value: string): string[] => (
  value.length > 0
    ? []
    : ['Must have at least 1 character.']
);

export const validatePasswordFormat = (value: string): string[] => (
  value.length >= 8
    ? []
    : ['Must be at least 8 characters.']
);
