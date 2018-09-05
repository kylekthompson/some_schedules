export default function initialFormStateFactory(fields) {
  return fields.reduce(
    (state, field) => ({
      ...state,
      [field]: {
        didBlur: false,
        errors: [],
        isDirty: false,
        value: '',
      },
    }),
    {},
  );
}
