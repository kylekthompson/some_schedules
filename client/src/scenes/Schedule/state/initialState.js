import time from 'models/time';

export default {
  selectedDay: time.current(),
  shiftCreationModal: {
    visible: false,
  },
  viewer: {
    errors: null,
    data: null,
    isLoaded: false,
  },
};
