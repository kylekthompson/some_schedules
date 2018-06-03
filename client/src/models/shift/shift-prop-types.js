import PropTypes from 'prop-types';
import { userPropTypes } from 'models/user';

const shiftPropTypes = PropTypes.shape({
  endTime: PropTypes.string,
  id: PropTypes.number,
  published: PropTypes.bool,
  startTime: PropTypes.string,
  user: userPropTypes,
});

export default shiftPropTypes;
