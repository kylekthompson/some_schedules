import * as actionTypes from './actionTypes';
import { IFlashesState, initialState } from './types';

export default (state: IFlashesState = initialState, { type, payload }) => {
  let newState: IFlashesState;

  switch (type) {
    case actionTypes.ADD_FLASH:
      newState = [
        ...state,
        payload.flash,
      ];

      return newState;

    case actionTypes.CLEAR_FLASH:
      newState = state.filter((flash) => flash.uuid !== payload.flashUuid);

      return newState;

    case actionTypes.CLEAR_FLASHES:
      newState = [];

      return newState;

    default:
      return state;
  }
};
