import styled, { css } from 'styled-components';

import { IModalProps } from './types';

const Modal = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, .1);
  padding: 10px;
  position: absolute;
  z-index: 2001;

  &:before {
    border-style: solid;
    border-width: 10px;
    content: '';
    display: block;
    position: absolute;

    ${({ x }: IModalProps) => {
      let cssString;

      if (x > document.body.clientWidth / 2) {
        cssString = css`right: 10px;`;
      } else {
        cssString = css`left: 10px;`;
      }

      return cssString;
    }}
    ${({ y }: IModalProps) => {
      let cssString;

      if (y > document.body.clientHeight / 2) {
        cssString = css`
          border-color: white transparent transparent transparent;
          bottom: -20px;
        `;
      } else {
        cssString = css`
          border-color: transparent transparent white transparent;
          top: -20px;
        `;
      }

      return cssString;
    }}
  }

  ${({ x }: IModalProps) => {
    let cssString;

    if (x > document.body.clientWidth / 2) {
      cssString = css`right: ${document.body.clientWidth - x - 20}px;`;
    } else {
      cssString = css`left: ${x - 20}px;`;
    }

    return cssString;
  }}
  ${({ y }: IModalProps) => {
    let cssString;

    if (y > document.body.clientHeight / 2) {
      cssString = css`bottom: ${document.body.clientHeight - y + 10 + 80}px;`;
    } else {
      cssString = css`top: ${y + 10}px;`;
    }

    return cssString;
  }}
`;

export default Modal;
