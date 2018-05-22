import styled from 'styled-components';
import { fonts } from 'models/styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

export const Message = styled.p`
  ${fonts.regular} font-size: 12px;
`;
