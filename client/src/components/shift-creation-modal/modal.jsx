/* eslint-disable indent */

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const Modal = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.1);
  padding: 10px;
  position: absolute;
  z-index: 2001;

  &:before {
    border-style: solid;
    border-width: 10px;
    content: '';
    display: block;
    position: absolute;

    ${({ x }) => {
      if (x > document.body.clientWidth / 2) {
        return css`
          right: 10px;
        `;
      }

      return css`
        left: 10px;
      `;
    }} ${({ y }) => {
      if (y > document.body.clientHeight / 2) {
        return css`
          border-color: white transparent transparent transparent;
          bottom: -20px;
        `;
      }

      return css`
        border-color: transparent transparent white transparent;
        top: -20px;
      `;
    }};
  }

  ${({ x }) => {
    if (x > document.body.clientWidth / 2) {
      return css`
        right: ${document.body.clientWidth - x - 20}px;
      `;
    }

    return css`
      left: ${x - 20}px;
    `;
  }} ${({ y }) => {
    if (y > document.body.clientHeight / 2) {
      return css`
        bottom: ${document.body.clientHeight - y + 10}px;
      `;
    }

    return css`
      top: ${y + 10}px;
    `;
  }};
`;

Modal.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Modal;
