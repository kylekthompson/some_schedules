const handleViewerLoaded = (viewer) => (state) => ({
  ...state,
  viewer: {
    isLoaded: true,
    ...viewer,
  },
});

export default handleViewerLoaded;
