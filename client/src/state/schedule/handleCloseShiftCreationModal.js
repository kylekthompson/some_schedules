const handleCloseShiftCreationModal = (state) => ({
  ...state,
  shiftCreationModal: {
    visible: false,
  },
});

export default handleCloseShiftCreationModal;
