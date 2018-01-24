const openShiftCreationModal = (userId, day, x, y) => (state) => ({
  ...state,
  shiftCreationModal: {
    ...state.shiftCreationModal,
    day,
    userId,
    x,
    y,
    visible: true,
  },
});

export default openShiftCreationModal;
