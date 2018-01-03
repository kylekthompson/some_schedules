import PropTypes from 'prop-types';

export const propTypes = PropTypes.shape({
  render: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired,
});
