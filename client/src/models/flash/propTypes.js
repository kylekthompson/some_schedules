import PropTypes from 'prop-types';

const propTypes = PropTypes.shape({
  render: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
});

export default propTypes;
