import styled, { css } from 'styled-components';

const CreateButton = styled.button`
  background-color: #FD4B00;
  border: 1px solid #FD4B00;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  line-height: 1;
  margin-left: 4px;
  padding: 7px;
  text-decoration: none;

  ${({ disabled }) => disabled && css`border-color: lightgrey; background-color: lightgrey;` || ''}
`;

export default CreateButton;
