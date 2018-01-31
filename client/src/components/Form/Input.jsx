/* eslint-disable indent */

import styled from 'styled-components';

import { colors } from 'models/constants';
import { fonts } from 'models/styles';

export default styled.input`
  ${fonts.regular}
  background-color: ${colors.white(0.0)};
  border: none;
  border-bottom: 1px solid ${({ isValid }) => {
    if (isValid) {
      return colors.catskillWhite();
    }

    return colors.stilettoRed();
  }};
  color: ${colors.white()};
  font-size: 14px;
  padding: 5px;

  &:focus {
    border-bottom: 1px solid ${({ isValid }) => {
      if (isValid) {
        return colors.bahamaBlue();
      }

      return colors.stilettoRed();
    }};
    outline: none;
  }

  &::placeholder {
    color: ${colors.white(0.5)};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    ${''/* this is a gross hack to remove the yellow autofill background color */}
    transition: color 9999s ease-out, background-color 9999s ease-out;
  }
`;
