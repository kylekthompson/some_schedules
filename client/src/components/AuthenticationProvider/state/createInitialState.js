import * as authentication from 'models/authentication';

const createInitialState = (isSignedIn = authentication.isSignedIn) => ({
  isSignedIn: isSignedIn(),
});

export default createInitialState;
