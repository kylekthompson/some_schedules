import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const PickerWrapper = styled.div`
  background-color: lightgrey;
  border-radius: 5px;
  left: 50%;
  margin-left: -100px;
  padding: 10px;
  position: absolute;
  text-align: center;
  top: 40px;
  width: 200px;

  &:before {
    border-color: transparent transparent lightgrey transparent;
    border-style: solid;
    border-width: 10px;
    content: '';
    display: block;
    left: 50%;
    margin-left: -10px;
    position: absolute;
    top: -20px;
  }

  ${({ visible }) => !visible ? css`display: none` : ''}
`;


PickerWrapper.propTypes = {
  visible: PropTypes.bool.isRequired,
};

export default PickerWrapper;
