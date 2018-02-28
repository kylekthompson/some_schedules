import { formValuesFromState } from 'models/form';

const handleInputChange = (field, validations, event) => {
  const { value } = event.currentTarget;
  return (state) => {
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
};

export default handleInputChange;
