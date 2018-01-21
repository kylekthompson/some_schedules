import PropTypes from 'prop-types';

const userPropTypes = PropTypes.shape({
  firstName: PropTypes.string,
  id: PropTypes.number,
  lastName: PropTypes.string,
});

export default userPropTypes;
