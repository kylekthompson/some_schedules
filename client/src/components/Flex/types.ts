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
  order?: string;
}

export interface IFlexChildProps extends IFlexProps {}
export interface IFlexContainerProps extends IFlexProps {}
