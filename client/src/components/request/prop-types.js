import PropTypes from 'prop-types';

export default PropTypes.shape({
  data: PropTypes.object,
  error: PropTypes.instanceOf(Error),
  failed: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  sendRequest: PropTypes.func.isRequired,
});
