import { clearFlash } from '../../../../services/store/Flashes/actionCreators';
import { IFlash } from '../../../../services/store/Flashes/types';

export interface IFlashProps {
  clearFlash: typeof clearFlash;
  flash: IFlash;
}
