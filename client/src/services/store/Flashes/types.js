export type FlashSeverity = 'danger' | 'info' | 'success' | 'warning';

export interface IFlash extends IFlashForCreation {
  uuid: string;
}

export interface IFlashForCreation {
  render: () => JSX.Element;
  severity: FlashSeverity;
}

export const initialState: IFlashesState = [];

export type IFlashesState = IFlash[];
