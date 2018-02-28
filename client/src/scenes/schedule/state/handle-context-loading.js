const handleContextLoading = (state) => ({
  ...state,
  context: {
    isLoaded: false,
  },
});

export default handleContextLoading;
