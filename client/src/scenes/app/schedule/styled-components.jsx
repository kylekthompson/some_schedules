import styled from 'styled-components';
import { colors, layout } from 'models/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`;

export const ContentContainer = styled.div`
  border-left: 1px solid ${colors.lightGrey()};
  flex: 1;
  height: calc(100vh - ${layout.headerHeight});
`;

export const SidebarContainer = styled.div`
  flex-direction: column;
  width: auto;
`;
