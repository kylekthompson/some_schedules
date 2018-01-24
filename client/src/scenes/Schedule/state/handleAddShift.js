const handleAddShift = (shift) => (state) => ({
  ...state,
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
