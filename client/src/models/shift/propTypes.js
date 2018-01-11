import PropTypes from 'prop-types';

import { propTypes as userPropTypes } from 'models/user';

const propTypes = PropTypes.shape({
  endTime: PropTypes.string,
  id: PropTypes.number,
  published: PropTypes.bool,
  startTime: PropTypes.string,
  user: userPropTypes,
});

export default propTypes;
