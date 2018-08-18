import { css } from 'styled-components';

const shared = css`
  font-family: 'Open Sans', sans-serif;
`;

const light = css`
  ${shared} font-weight: 300;
`;

const regular = css`
  ${shared} font-weight: 400;
`;

const semiBold = css`
  ${shared} font-weight: 600;
`;

const bold = css`
  ${shared} font-weight: 700;
`;

const extraBold = css`
  ${shared} font-weight: 800;
`;

export default {
  bold,
  extraBold,
  light,
  regular,
  semiBold,
};
