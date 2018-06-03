import styled from 'styled-components';
import { colors } from 'models/styles';

export const Container = styled.div`
  background: ${colors.catskillWhite()};
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const HeaderContainer = styled.div`
  border-bottom: 1px solid ${colors.lightGrey()};
  padding: 0 20px;
`;

export const HeaderLinksContainer = styled.div`
  margin-left: auto;
  font-size: 14px;
`;
