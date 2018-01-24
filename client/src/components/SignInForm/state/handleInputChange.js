import { formValuesFromState } from 'models/form';

const handleInputChange = (field, validations, event) => {
  const value = event.currentTarget.value;
  return (state) => {
    let errors = [];

    if (state.form[field].didBlur) {
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
          value,
        },
      },
    };
  };
};

export default handleInputChange;
