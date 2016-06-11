import { handleActions, createAction } from 'redux-actions';

const CHALLENGE_LOAD = 'challengeDetails/CHALLENGE_LOAD';
const AUTO_RUN_TOUR = 'challengeDetails/AUTO_RUN_TOUR';

export function loadChallenge(id) {
  return {
    fatal: true,
    type: CHALLENGE_LOAD,
    promise: ({ client }) => client.get('/problems/' + id),
  };
}

export const setAutoRunTour = createAction(AUTO_RUN_TOUR);

export default handleActions({
  [CHALLENGE_LOAD]: (state, { payload: challenge }) => ({ ...state, challenge }),
  [AUTO_RUN_TOUR]: (state, {payload: autoRunTour}) => ({...state, autoRunTour})
}, {
  autoRunTour: false
});
