import styled from 'styled-components';
import { colors, fonts } from 'models/styles';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 400px) {
    width: 400px;
  }
`;

export const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 4px;
`;

export const ErrorIcon = styled.i.attrs({
  className: 'fal fa-exclamation-circle',
})`
  color: ${colors.stilettoRed()};
  margin-right: 6px;
`;

export const ErrorText = styled.p`
  ${fonts.light}
  color: ${colors.white()};
  font-size: 14px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: 60px;
`;

export const Input = styled.input`
  ${fonts.regular}
  background-color: ${colors.white(0.0)};
  border: none;
  border-bottom: 1px solid ${({ isValid }) => {
    if (isValid) {
      return colors.catskillWhite();
    }

    return colors.stilettoRed();
  }};
  color: ${colors.white()};
  font-size: 14px;
  padding: 5px;

  &:focus {
    border-bottom: 1px solid ${({ isValid }) => {
      if (isValid) {
        return colors.bahamaBlue();
      }

      return colors.stilettoRed();
    }};
    outline: none;
  }

  &::placeholder {
    color: ${colors.white(0.5)};
  }
`;

export const Label = styled.p`
  ${fonts.light}
  color: ${colors.white()};
  font-size: 14px;

  &:not(:first-child) {
    margin-top: 30px;
  }
`;

export const Submit = styled.input.attrs({
  type: 'submit',
})`
  ${fonts.regular}
  background-color: ${colors.white(0.0)};
  border: 1px solid ${colors.white(0.25)};
  border-radius: 2px;
  box-shadow: none;
  color: ${colors.white()};
  font-size: 14px;
  margin-top: 30px;
  padding: 5px;

  &:focus,
  &:hover {
    background-color: ${colors.white(0.01)};
    box-shadow: 1px 1px 4px ${colors.black(0.2)};
    cursor: pointer;
    outline: none;
  }

  &:active {
    box-shadow: 3px 3px 12px ${colors.black(0.2)};
    outline: none;
  }

  &:disabled {
    background-color: ${colors.white(0.05)};
    border: none;
    box-shadow: none;
    color: ${colors.white(0.25)};
    cursor: auto;
    outline: none;
  }

  &::placeholder {
    color: ${colors.white(0.5)};
  }
`;

export const Subtitle = styled.p`
  ${fonts.light}
  color: ${colors.white()};
  font-size: 14px;
`;

export const Title = styled.p`
  ${fonts.light}
  color: ${colors.white()};
  font-size: 40px;
  margin-bottom: 10px;
`;
