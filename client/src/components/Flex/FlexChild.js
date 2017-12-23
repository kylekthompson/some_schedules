import styled, { css } from 'styled-components';

export default styled.div`
  ${({ alignContent }) => alignContent ? css`align-content: ${alignContent};` : ''}
  ${({ alignItems }) => alignItems ? css`align-items: ${alignItems};` : ''}
  ${({ alignSelf }) => alignSelf ? css`align-self: ${alignSelf};` : ''}
  ${({ flex }) => flex ? css`flex: ${flex};` : ''}
  ${({ flexBasis }) => flexBasis ? css`flex-basis: ${flexBasis};` : ''}
  ${({ flexDirection }) => flexDirection ? css`flex-direction: ${flexDirection};` : ''}
  ${({ flexFlow }) => flexFlow ? css`flex-flow: ${flexFlow};` : ''}
  ${({ flexGrow }) => flexGrow ? css`flex-grow: ${flexGrow};` : ''}
  ${({ flexShrink }) => flexShrink ? css`flex-shrink: ${flexShrink};` : ''}
  ${({ flexWrap }) => flexWrap ? css`flex-wrap: ${flexWrap};` : ''}
  ${({ justifyContent }) => justifyContent ? css`justify-content: ${justifyContent};` : ''}
  ${({ maxWidth }) => maxWidth ? css`max-width: ${maxWidth};` : ''}
  ${({ minWidth }) => minWidth ? css`min-width: ${minWidth};` : ''}
  ${({ order }) => order ? css`order: ${order};` : ''}
  ${({ textAlign }) => textAlign ? css`text-align: ${textAlign};` : ''}
  ${({ width }) => width ? css`width: ${width};` : ''}
`;
