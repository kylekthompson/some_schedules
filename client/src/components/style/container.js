import styled, { css } from 'styled-components';

export default styled.div`
  display: flex;
  ${({ flex = 1 }) => css`flex: ${flex};`}
  ${({ flexDirection = 'column' }) => css`flex-direction: ${flexDirection};`}
  ${({ overrides = css`` }) => overrides}
`;
