import formValuesFromState from 'models/form/form-values-from-state';

export default function handleInputBlur(field, validations, event) {
  const { value } = event.currentTarget;

  return function(state) {
    let errors = [];
    const isDirty = state.form[field].didBlur || Boolean(value);

    if (isDirty) {
      errors = validations[field].run({
        ...formValuesFromState(state),
        [field]: value,
      });
    }

    return {
      ...state,
      form: {
        ...state.form,
        [field]: {
          ...state.form[field],
          didBlur: true,
          errors,
          isDirty,
          value,
        },
      },
    };
  };
}
