const handleInputChange = (field, event) => {
  const value = event.currentTarget.value;
  return (state) => ({
    ...state,
    form: {
      ...state.form,
      [field]: {
        ...state.form[field],
        value,
      },
    },
  });
};

export default handleInputChange;
