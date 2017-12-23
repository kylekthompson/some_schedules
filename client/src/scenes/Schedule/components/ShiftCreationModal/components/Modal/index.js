import styled, { css } from 'styled-components';

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

    ${({ x }) => x > document.body.clientWidth / 2 ? css`right: 10px;` : css`left: 10px;`}
    ${({ y }) => y > document.body.clientHeight / 2
      ? css`border-color: white transparent transparent transparent; bottom: -20px;`
      : css`border-color: transparent transparent white transparent; top: -20px;`
    }
  }

  ${({ x }) => x > document.body.clientWidth / 2
    ? css`right: ${document.body.clientWidth - x - 20}px;`
    : css`left: ${x - 20}px;`
  }
  ${({ y }) => {
    // the 80 here is to account for the footer's height and margin
    return y > document.body.clientHeight / 2
      ? css`bottom: ${document.body.clientHeight - y + 10 + 80}px;`
      : css`top: ${y + 10}px;`;
  }}
`;

export default Modal;
