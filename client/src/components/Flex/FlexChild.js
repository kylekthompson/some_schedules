import styled, { css } from 'styled-components';

import { IFlexChildProps } from './types';

export default styled.div`
  ${({ alignContent }: IFlexChildProps) => alignContent && css`align-content: ${alignContent};` || ''}
  ${({ alignItems }: IFlexChildProps) => alignItems && css`align-items: ${alignItems};` || ''}
  ${({ alignSelf }: IFlexChildProps) => alignSelf && css`align-self: ${alignSelf};` || ''}
  ${({ flex }: IFlexChildProps) => flex && css`flex: ${flex};` || ''}
  ${({ flexBasis }: IFlexChildProps) => flexBasis && css`flex-basis: ${flexBasis};` || ''}
  ${({ flexDirection }: IFlexChildProps) => flexDirection && css`flex-direction: ${flexDirection};` || ''}
  ${({ flexFlow }: IFlexChildProps) => flexFlow && css`flex-flow: ${flexFlow};` || ''}
  ${({ flexGrow }: IFlexChildProps) => flexGrow && css`flex-grow: ${flexGrow};` || ''}
  ${({ flexShrink }: IFlexChildProps) => flexShrink && css`flex-shrink: ${flexShrink};` || ''}
  ${({ flexWrap }: IFlexChildProps) => flexWrap && css`flex-wrap: ${flexWrap};` || ''}
  ${({ justifyContent }: IFlexChildProps) => justifyContent && css`justify-content: ${justifyContent};` || ''}
  ${({ maxWidth }: IFlexChildProps) => maxWidth && css`max-width: ${maxWidth};` || ''}
  ${({ minWidth }: IFlexChildProps) => minWidth && css`min-width: ${minWidth};` || ''}
  ${({ order }: IFlexChildProps) => order && css`order: ${order};` || ''}
  ${({ textAlign }: IFlexChildProps) => textAlign && css`text-align: ${textAlign};` || ''}
  ${({ width }: IFlexChildProps) => width && css`width: ${width};` || ''}
`;
