import styled from 'styled-components';
import { colors } from 'models/styles';

export const Container = styled.div`
  background: ${colors.bahamaBlue()}
    linear-gradient(
      to right,
      ${colors.shakespeareBlue(1)},
      ${colors.shakespeareBlue(0.2)}
    );

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 20px;
`;

export const HeaderLinksContainer = styled.div`
  margin-left: auto;
  font-size: 14px;
`;
