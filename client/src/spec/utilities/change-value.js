import findTestId from 'spec/utilities/find-test-id';

const changeValue = (wrapper, testId, value) => findTestId(wrapper, testId).props().onChange({
  currentTarget: {
    value,
  },
});

export default changeValue;
