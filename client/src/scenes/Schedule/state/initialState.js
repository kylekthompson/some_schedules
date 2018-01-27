import { current } from 'models/time';

export default {
  selectedDay: current(),
  shiftCreationModal: {
    visible: false,
  },
  viewer: {
    errors: null,
    data: null,
    isLoaded: false,
  },
};
