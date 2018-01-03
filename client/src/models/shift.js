import PropTypes from 'prop-types';

import { propTypes as userPropTypes } from './user';

export const propTypes = PropTypes.shape({
  endTime: PropTypes.string,
  id: PropTypes.number,
  published: PropTypes.bool,
  startTime: PropTypes.string,
  user: userPropTypes,
});
