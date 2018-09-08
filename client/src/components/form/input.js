import styled from 'styled-components';
import { fonts, shadows } from 'models/style';

export default styled.input`
  ${fonts.regular}
  ${shadows.inputs.normal}
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
  outline: none;
  padding: 6px 8px;
  transition: all .08s ease-in;
  width: 100%;

  &:focus {
    ${shadows.inputs.focus}
  }
`;
