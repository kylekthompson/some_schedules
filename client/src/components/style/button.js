import styled from 'styled-components';
import { colors, shadows } from 'models/style';

export default styled.button`
  ${shadows.buttons.normal}
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  padding: 10px;
  transition: all .15s ease;

  &:disabled {
    background-color: ${colors.graniteGray(.15)};
    cursor: not-allowed;
  }

  &:focus:not(:active):not(:disabled) {
    ${shadows.buttons.hover}
    transform: translateY(-1px);
  }

  &:hover:not(:disabled) {
    ${shadows.buttons.hover}
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    ${shadows.buttons.normal}
    transform: translateY(1px);
  }
`;
