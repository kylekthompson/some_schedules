import { clearFlash } from '../../services/store/Flashes/actionCreators';
import { IFlash } from '../../services/store/Flashes/types';

export interface IFlashesProps {
  clearFlash: typeof clearFlash;
  flashes: IFlash[];
}
