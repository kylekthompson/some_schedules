import styled from 'styled-components';
import { colors, fonts } from 'models/style';

export default styled.input`
  ${fonts.regular}
  border: 0;
  border-radius: 4px;
  box-shadow:
    0 0 0 1px ${colors.rackleyBlue(.16)},
    0 1px 1px ${colors.eerieBlack(.08)};
  font-size: 14px;
  margin-bottom: 10px;
  outline: none;
  padding: 6px 8px;
  transition: all .08s ease-in;
  width: 100%;

  &:focus {
    box-shadow:
      0 0 0 1px ${colors.rackleyBlue(.2)},
      0 1px 1px ${colors.eerieBlack(.08)},
      0 0 0 2px ${colors.rackleyBlue(.25)};
  }
`;
