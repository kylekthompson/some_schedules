import styled, { css } from 'styled-components';
import { colors, fonts, links } from 'models/styles';

export const Container = styled.div`
  border-bottom: 1px solid ${colors.lightGrey()};
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const DayContainer = styled.div`
  align-items: center;
  border-radius: 13px;
  cursor: pointer;
  display: flex;
  flex: 1;
  font-size: 12px;
  height: 26px;
  justify-content: center;
  margin: 2px;
  width: 26px;

  ${({ selected }) => {
    if (selected) {
      return css`
        background-color: ${colors.shakespeareBlue()};
      `;
    }

    return css`
      background-color: ${colors.catskillWhite()};
    `;
  }} &:hover {
    ${({ selected }) => {
      if (selected) {
        return css`
          background-color: ${colors.shakespeareBlue()};
        `;
      }

      return css`
        background-color: ${colors.lightGrey()};
      `;
    }};
  }
`;

export const DayText = styled.p`
  ${fonts.regular}
  color: ${colors.darkGrey()};
  font-size: 12px;
  ${({ activeMonth }) =>
    !activeMonth
      ? css`
          color: ${colors.darkGrey(0.5)};
        `
      : css``}
  ${({ selected }) =>
    selected
      ? css`
          color: ${colors.white()};
        `
      : css``}
`;

export const HeaderDay = styled.div`
  flex: 1;
  text-align: center;
`;

export const HeaderText = styled.p`
  ${fonts.semiBold}
  color: ${colors.darkGrey(0.5)};
  font-size: 12px;
`;

export const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NavigationButton = styled.a`
  ${links.darkLink}
  color: ${colors.darkGrey(0.5)};

  &:not(:first-child) {
    margin-left: 20px;
  }
`;

export const NavigationContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const NavigationText = styled.p`
  ${fonts.semiBold}
  color: ${colors.darkGrey(0.5)};
  font-size: 12px;
  margin-right: auto;
`;

export const Week = styled.div`
  display: flex;
  flex-direction: row;
`;
