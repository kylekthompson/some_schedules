import * as uuid from 'uuid/v4';

import * as actionTypes from './actionTypes';
import { IFlashForCreation } from './types';

export const addFlash = (flash: IFlashForCreation) => ({
  payload: {
    flash: {
      ...flash,
      uuid: uuid(),
    },
  },
  type: actionTypes.ADD_FLASH,
});

export const clearFlash = (uuid: string) => ({
  payload: {
    flashUuid: uuid,
  },
  type: actionTypes.CLEAR_FLASH,
});

export const clearFlashes = () => ({
  type: actionTypes.CLEAR_FLASHES,
});
