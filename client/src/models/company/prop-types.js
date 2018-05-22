import PropTypes from 'prop-types';
import { shiftPropTypes } from 'models/shift';
import { userPropTypes } from 'models/user';

const propTypes = PropTypes.shape({
  id: PropTypes.number,
  shifts: PropTypes.arrayOf(shiftPropTypes),
  users: PropTypes.arrayOf(userPropTypes),
});

export default propTypes;
