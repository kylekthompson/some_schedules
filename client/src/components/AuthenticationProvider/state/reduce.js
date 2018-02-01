/* eslint-disable no-param-reassign */

import produce from 'immer';

import { SIGN_IN, SIGN_OUT } from 'components/AuthenticationProvider/state/types';

const reduce = ({ type }) => (state) => produce(state, (draft) => {
  switch (type) {
    case SIGN_IN:
      draft.isSignedIn = true;
      break;
    case SIGN_OUT:
      draft.isSignedIn = false;
      break;
    default:
      break;
  }
});

export default reduce;
