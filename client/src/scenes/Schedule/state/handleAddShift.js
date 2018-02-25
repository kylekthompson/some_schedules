const handleAddShift = (shift) => (state) => ({
  ...state,
  shiftCreationModal: {
    visible: false,
  },
  context: {
    ...state.context,
    shifts: [
      ...state.context.shifts,
      shift,
    ],
  },
});

export default handleAddShift;
