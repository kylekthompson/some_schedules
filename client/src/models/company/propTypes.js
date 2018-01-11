import PropTypes from 'prop-types';

import { propTypes as shiftPropTypes } from 'models/shift';
import { propTypes as userPropTypes } from 'models/user';

const propTypes = PropTypes.shape({
  id: PropTypes.number,
  shifts: PropTypes.arrayOf(shiftPropTypes),
  users: PropTypes.arrayOf(userPropTypes),
});

export default propTypes;
