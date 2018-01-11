import { css } from 'styled-components';

const shared = css`
  font-family: 'Open Sans', sans-serif;
`;

export default {
  light: css`
    ${shared}
    font-weight: 300;
  `,
  regular: css`
    ${shared}
    font-weight: 400;
  `,
  semiBold: css`
    ${shared}
    font-weight: 600;
  `,
  bold: css`
    ${shared}
    font-weight: 700;
  `,
  extraBold: css`
    ${shared}
    font-weight: 800;
  `,
}
