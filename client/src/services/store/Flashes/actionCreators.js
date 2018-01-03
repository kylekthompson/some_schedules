import uuidGenerator from 'uuid/v4';

import * as actionTypes from './actionTypes';

export const addFlash = (flash) => ({
  payload: {
    flash: {
      ...flash,
      uuid: uuidGenerator(),
    },
  },
  type: actionTypes.ADD_FLASH,
});

export const clearFlash = (uuid) => ({
  payload: {
    flashUuid: uuid,
  },
  type: actionTypes.CLEAR_FLASH,
});

export const clearFlashes = () => ({
  type: actionTypes.CLEAR_FLASHES,
});
