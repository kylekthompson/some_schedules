import PropTypes from 'prop-types';
import styled from 'styled-components';

const FontSizeAdjuster = styled.span`
  font-size: ${({ fontSize }) => fontSize}px;
`;

FontSizeAdjuster.propTypes = {
  fontSize: PropTypes.number.isRequired,
};

export default FontSizeAdjuster;
