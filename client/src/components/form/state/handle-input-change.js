import formValuesFromState from 'models/form/form-values-from-state';

export default function handleInputChange(field, validations, event) {
  const { value } = event.currentTarget;

  return function(state) {
    let errors = [];

    if (state.form[field].didBlur && state.form[field].isDirty) {
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
          errors,
          isDirty: true,
          value,
        },
      },
    };
  };
}
