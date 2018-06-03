import { current } from 'models/time';

export function handleAddShift(shift) {
  return function(state) {
    return {
      ...state,
      shiftCreationModal: {
        visible: false,
      },
      context: {
        ...state.context,
        shifts: [...state.context.shifts, shift],
      },
    };
  };
}

export function handleCloseShiftCreationModal(state) {
  return {
    ...state,
    shiftCreationModal: {
      visible: false,
    },
  };
}

export function handleContextLoaded(context, error) {
  return function(state) {
    return {
      ...state,
      context: {
        isLoaded: true,
        error,
        ...context,
      },
    };
  };
}

export function handleContextLoading(state) {
  return {
    ...state,
    context: {
      isLoaded: false,
    },
  };
}

export function handleDayClick(day) {
  return function(state) {
    return {
      ...state,
      selectedDay: day,
    };
  };
}

export function handleOpenShiftCreationModal(userId, day, x, y) {
  return function(state) {
    return {
      ...state,
      shiftCreationModal: {
        ...state.shiftCreationModal,
        day,
        userId,
        x,
        y,
        visible: true,
      },
    };
  };
}

export const initialState = {
  selectedDay: current(),
  shiftCreationModal: {
    visible: false,
  },
  context: {
    error: null,
    isLoaded: false,
    shifts: null,
    users: null,
  },
};
