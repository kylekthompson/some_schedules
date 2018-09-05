import colors from 'src/models/style/colors';
import { css } from 'styled-components';

const hover = css`
  box-shadow:
    0 7px 14px ${colors.darkRackleyBlue(.1)},
    0 3px 6px ${colors.eerieBlack(.08)};
`;

const normal = css`
  box-shadow:
    0 4px 6px ${colors.darkRackleyBlue(.11)},
    0 1px 3px ${colors.eerieBlack(.08)};
`;

export default {
  active: normal,
  hover,
  normal,
};
