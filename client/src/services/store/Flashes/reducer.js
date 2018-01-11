import * as actionTypes from 'services/store/Flashes/actionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  let newState;

  switch (type) {
    case actionTypes.ADD_FLASH:
      newState = [
        ...state,
        payload.flash,
      ];

      return newState;

    case actionTypes.DISMISS_FLASH:
      newState = state.filter((flash) => flash.uuid !== payload.flashUuid);

      return newState;

    case actionTypes.DISMISS_FLASHES:
      newState = [];

      return newState;

    default:
      return state;
  }
};
