const redirectedFrom = (location = {}) =>
  (location.state && location.state.from && location.state.from.pathname) || '/';

export default redirectedFrom;
