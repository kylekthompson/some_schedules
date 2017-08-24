import styled, { keyframes } from 'styled-components';

const spinning = keyframes`
  0% {
    transform: scale(1) rotate(0deg);
  }

  100% {
    transform: scale(1) rotate(360deg);
  }
`;

export const Spinning = (Component) => styled(Component)`
  animation: ${spinning} .7s infinite linear;
`;
