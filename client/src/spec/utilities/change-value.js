import findTestId from 'spec/utilities/findTestId';

const changeValue = (wrapper, testId, value) => findTestId(wrapper, testId).props().onChange({
  currentTarget: {
    value,
  },
});

export default changeValue;
