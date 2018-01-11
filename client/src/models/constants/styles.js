import { css } from 'styled-components';

import colors from 'models/constants/colors'

const createLinkStyle = (primaryColor, secondaryColor) => css`
  color: ${primaryColor};

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

export default {
  darkLink: createLinkStyle(colors.black(), colors.darkGrey()),
  lightLink: createLinkStyle(colors.white(), colors.lightGrey()),
}
