const findTestId = (wrapper, testId) => wrapper.findWhere((node) => node.props().testId === testId);

export default findTestId;
