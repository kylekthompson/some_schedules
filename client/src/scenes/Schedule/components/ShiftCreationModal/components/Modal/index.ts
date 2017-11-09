import styled from 'styled-components';

import { IModalProps } from './types';

const Modal = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, .1);
  left: ${({ x }: IModalProps) => x - 20}px;
  padding: 10px;
  position: absolute;
  top: ${({ y }: IModalProps) => y + 10}px;
  z-index: 2001;

  &:before {
    border-color: transparent transparent white transparent;
    border-style: solid;
    border-width: 10px;
    content: '';
    display: block;
    left: 10px;
    position: absolute;
    top: -20px;
  }
`;

export default Modal;
