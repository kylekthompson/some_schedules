import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const propTypes = {
  alignContent: PropTypes.string,
  alignItems: PropTypes.string,
  alignSelf: PropTypes.string,
  flex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexBasis: PropTypes.string,
  flexDirection: PropTypes.string,
  flexFlow: PropTypes.string,
  flexGrow: PropTypes.string,
  flexShrink: PropTypes.string,
  flexWrap: PropTypes.string,
  justifyContent: PropTypes.string,
  maxWidth: PropTypes.string,
  minWidth: PropTypes.string,
  order: PropTypes.string,
  textAlign: PropTypes.string,
  width: PropTypes.string,
};

const FlexChild = styled.div`
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

FlexChild.propTypes = propTypes;

export default FlexChild;
