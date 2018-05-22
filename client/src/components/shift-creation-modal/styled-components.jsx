import styled, { css } from 'styled-components';
import { colors, fonts } from 'models/styles';

export const BackgroundMuter = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 2000;
`;

export const CreateButton = styled.button`
  background-color: #fd4b00;
  border: 1px solid #fd4b00;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  line-height: 1;
  margin-left: 4px;
  padding: 7px;
  text-decoration: none;

  ${({ disabled }) => {
    if (disabled) {
      return css`
        border-color: lightgrey;
        background-color: lightgrey;
      `;
    }

    return '';
  }};
`;

export const DismissButton = styled.a.attrs({
  children: '×',
})`
  font-size: 18px;
  float: right;
  cursor: pointer;
  text-decoration: none;
  color: #333;

  &:hover {
    color: #333;
    text-decoration: none;
  }
`;

export const Modal = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 4px 4px 4px 1px rgba(0, 0, 0, 0.1);
  padding: 10px;
  position: absolute;
  z-index: 2001;

  &:before {
    border-style: solid;
    border-width: 10px;
    content: '';
    display: block;
    position: absolute;

    ${({ x }) => {
      if (x > document.body.clientWidth / 2) {
        return css`
          right: 10px;
        `;
      }

      return css`
        left: 10px;
      `;
    }} ${({ y }) => {
      if (y > document.body.clientHeight / 2) {
        return css`
          border-color: white transparent transparent transparent;
          bottom: -20px;
        `;
      }

      return css`
        border-color: transparent transparent white transparent;
        top: -20px;
      `;
    }};
  }

  ${({ x }) => {
    if (x > document.body.clientWidth / 2) {
      return css`
        right: ${document.body.clientWidth - x - 20}px;
      `;
    }

    return css`
      left: ${x - 20}px;
    `;
  }} ${({ y }) => {
    if (y > document.body.clientHeight / 2) {
      return css`
        bottom: ${document.body.clientHeight - y + 10}px;
      `;
    }

    return css`
      top: ${y + 10}px;
    `;
  }};
`;

export const Separator = styled.hr`
  margin: 10px -10px;
`;

export const Text = styled.span`
  ${fonts.regular} font-size: 18px;
`;

export const TimeInput = styled.input`
  border: 1px solid ${colors.lightGrey()};
  border-radius: 4px;
  line-height: 1;
  padding: 6px;

  &:focus {
    outline: none;
  }
`;
