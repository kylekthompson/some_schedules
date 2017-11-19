import { Moment } from 'moment-timezone';

import { IShift, IUser } from '../../../../services/graphql/types';

export interface IShiftCreationModalProps {
  day: Moment;
  dismissModal: () => void;
  onAddShift: (shift: IShift) => void;
  user: IUser;
  x: number;
  y: number;
}

export interface IShiftCreationModalState {
  endTime?: Moment;
  showParsedTimes: boolean;
  startTime?: Moment;
  timesInput: string;
}