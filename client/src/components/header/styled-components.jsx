import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fonts, layout, links } from 'models/styles';
import { header } from 'models/constants';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex: none;
  flex-direction: row;
  height: ${layout.headerHeight};
`;

export const HeaderLink = styled(Link)`
  ${fonts.regular} font-size: 14px;

  &:not(:first-child) {
    margin-left: 20px;
  }

  ${({ theme }) => {
    if (theme === header.DARK_THEME) {
      return links.darkLink;
    }

    return links.lightLink;
  }};
`;

export const LogoLink = styled(HeaderLink)`
  ${fonts.extraBold} flex: 0;
  font-size: 22px;
`;
