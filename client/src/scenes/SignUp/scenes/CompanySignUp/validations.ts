const validateSlugFormat = (value: string): string[] => (
  /\A[\w-]+\z/.exec(value)
    ? []
    : ['must contain only letters, numbers, underscores, or hyphens.']
);

const validateHasCharacters = (value: string): string[] => (
  value.length > 0
    ? []
    : ['must have at least 1 character.']
);

export const syncNameValidation = (value: string): string[] => validateHasCharacters(value);
export const syncSlugValidation = (value: string): string[] => validateSlugFormat(value);
