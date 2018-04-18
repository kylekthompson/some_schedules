import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const CreateButton = styled.button`
  background-color: #fd4b00;
  border: 1px solid #fd4b00;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  line-height: 1;
  margin-left: 4px;
  padding: 7px;
  text-decoration: none;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        border-color: lightgrey;
        background-color: lightgrey;
      `;
    }

    return '';
  }};
`;

CreateButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
};

export default CreateButton;
