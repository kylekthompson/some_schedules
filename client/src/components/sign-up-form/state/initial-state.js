const FORM_FIELDS = ['name', 'slug', 'firstName', 'lastName', 'email', 'password', 'passwordConfirmation'];

const initialFormState = FORM_FIELDS.reduce((state, field) => ({
  ...state,
  [field]: {
    didBlur: false,
    errors: [],
    isDirty: false,
    value: '',
  },
}), {});

export default {
  form: initialFormState,
};
