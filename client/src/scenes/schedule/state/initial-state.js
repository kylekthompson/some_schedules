import { current } from 'models/time';

export default {
  selectedDay: current(),
  shiftCreationModal: {
    visible: false,
  },
  context: {
    error: null,
    isLoaded: false,
    shifts: null,
    users: null,
  },
};
