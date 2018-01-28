const handleAddShift = (shift) => (state) => ({
  ...state,
  shiftCreationModal: {
    visible: false,
  },
  viewer: {
    ...state.viewer,
    data: {
      ...state.viewer.data,
      company: {
        ...state.viewer.data.company,
        shifts: [
          ...state.viewer.data.company.shifts,
          shift,
        ],
      },
    },
  },
});

export default handleAddShift;
