import { css } from 'styled-components';

import { colors } from 'models/constants'

const createLinkStyle = (primaryColor, secondaryColor) => css`
  color: ${primaryColor};
  cursor: pointer;

  &:hover {
    color: ${secondaryColor};
    text-decoration: none;
  }

  &:focus {
    color: ${primaryColor};
    outline: none;
    text-decoration: none;
  }
`;

const darkLink = createLinkStyle(colors.black(), colors.darkGrey());
const lightLink = createLinkStyle(colors.white(), colors.lightGrey());

export default {
  darkLink,
  lightLink,
};