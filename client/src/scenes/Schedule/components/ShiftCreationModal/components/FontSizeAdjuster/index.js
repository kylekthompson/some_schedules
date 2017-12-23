import styled from 'styled-components';

import { IFontSizeAdjusterProps } from './types';

const FontSizeAdjuster = styled.span`
  font-size: ${({ fontSize }: IFontSizeAdjusterProps) => fontSize}px;
`;

export default FontSizeAdjuster;
