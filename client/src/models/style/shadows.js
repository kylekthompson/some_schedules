import colors from 'models/style/colors';
import { css } from 'styled-components';

const buttons = {
  hover: css`
    box-shadow:
      0 7px 14px ${colors.darkRackleyBlue(.1)},
      0 3px 6px ${colors.eerieBlack(.08)};
  `,
  normal: css`
    box-shadow:
      0 4px 6px ${colors.darkRackleyBlue(.11)},
      0 1px 3px ${colors.eerieBlack(.08)};
  `,
};

const containers = {
  normal: css`
    box-shadow:
      0 4px 6px ${colors.darkRackleyBlue(.11)},
      0 1px 3px ${colors.eerieBlack(.08)};
  `,
};

const inputs = {
  focus: css`
    box-shadow:
      0 0 0 1px ${({ isValid }) => isValid ? colors.rackleyBlue(.2) : colors.portlandOrange(.25)},
      0 1px 1px ${colors.eerieBlack(.08)},
      0 0 0 2px ${({ isValid }) => isValid ? colors.rackleyBlue(.25) : colors.portlandOrange(.30)};
  `,
  normal: css`
    box-shadow:
      0 0 0 1px ${({ isValid }) => isValid ? colors.rackleyBlue(.16) : colors.portlandOrange(.35)},
      0 1px 1px ${colors.eerieBlack(.08)};
  `,
};

export default {
  buttons,
  containers,
  inputs,
};
