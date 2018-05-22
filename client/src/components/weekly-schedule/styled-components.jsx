import styled from 'styled-components';
import { colors, fonts } from 'models/styles';

export const Cell = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 8px;

  &:not(:last-child) {
    border-right: 1px solid ${colors.lightGrey()};
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const HeaderCell = styled(Cell)`
  padding: 8px;
`;

export const EmptyHeaderCell = styled(HeaderCell)`
  min-width: 150px;
  max-width: 150px;
`;

export const NameCell = styled(Cell)`
  height: 60px;
  justify-content: center;
  max-width: 150px;
  min-width: 150px;
`;

export const RowContainer = styled.div`
  border-bottom: 1px solid ${colors.lightGrey()};
  display: flex;
  flex-direction: row;
`;

export const Scroller = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const ShiftContainer = styled.div`
  align-items: center;
  border-radius: 2px;
  display: flex;
  flex: none;
  flex-direction: row;
  margin-bottom: 5px;

  :last-child {
    margin-bottom: 0;
  }
`;

export const WeekdayText = styled.p`
  ${fonts.regular} font-size: 12px;
`;

export const DateText = styled.p`
  ${fonts.semiBold} font-size: 48px;
  line-height: 36px;
`;

export const HeaderDayContainer = styled.div`
  flex: 1;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  border-bottom: 1px solid ${colors.lightGrey()};
  display: flex;
  flex: none;
  flex-direction: row;
`;

export const ColoredDot = styled.div`
  background-color: ${({ color }) => color};
  border-radius: 10px;
  height: 10px;
  margin-right: 5px;
  width: 10px;
`;

export const PublishedIcon = styled.i.attrs({
  className: ({ isPublished }) =>
    isPublished ? 'fal fa-eye' : 'fal fa-eye-slash',
})`
  margin-right: 5px;
`;

export const ShiftText = styled.p`
  ${fonts.regular} font-size: 12px;
  margin: 0;
`;
