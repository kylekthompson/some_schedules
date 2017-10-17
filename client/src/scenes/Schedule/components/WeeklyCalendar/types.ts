import { IUser } from '../../../../services/graphql/types';

export interface IWeeklyCalendarProps {
  initialWeekNumber: number;
  onWeekChange: (newWeekNumber: number) => void;
  users: IUser[];
}
