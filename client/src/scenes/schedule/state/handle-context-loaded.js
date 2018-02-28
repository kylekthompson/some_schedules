const handleContextLoaded = (context, error) => (state) => ({
  ...state,
  context: {
    isLoaded: true,
    error,
    ...context,
  },
});

export default handleContextLoaded;
