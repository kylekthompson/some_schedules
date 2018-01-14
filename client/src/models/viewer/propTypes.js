import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    shifts: PropTypes.arrayOf(PropTypes.shape({
      endTime: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      published: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }).isRequired,
    })).isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      lastName: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  firstName: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  lastName: PropTypes.string.isRequired,
});

export default propTypes;
