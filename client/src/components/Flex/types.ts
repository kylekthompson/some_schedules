interface IFlexProps {
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  flex?: string;
  flexBasis?: string;
  flexDirection?: string;
  flexFlow?: string;
  flexGrow?: string;
  flexShrink?: string;
  flexWrap?: string;
  justifyContent?: string;
  maxWidth?: string;
  minWidth?: string;
  order?: string;
  textAlign?: string;
  width?: string;
}

export interface IFlexChildProps extends IFlexProps {}
export interface IFlexContainerProps extends IFlexProps {}
