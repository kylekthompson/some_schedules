const handleViewerLoading = (state) => ({
  ...state,
  viewer: {
    isLoaded: false,
  },
});

export default handleViewerLoading;
