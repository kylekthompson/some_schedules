import uuidGenerator from 'uuid/v4';

import * as actionTypes from 'services/store/Flashes/actionTypes';

export const addFlash = (flash) => ({
  payload: {
    flash: {
      ...flash,
      uuid: uuidGenerator(),
    },
  },
  type: actionTypes.ADD_FLASH,
});

export const dismissFlash = (uuid) => ({
  payload: {
    flashUuid: uuid,
  },
  type: actionTypes.DISMISS_FLASH,
});

export const dismissFlashes = () => ({
  type: actionTypes.DISMISS_FLASHES,
});
