import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import {reducer as form} from 'redux-form';
import info from './info';
import challenges from './challenges';
import global from './global';
import challengeDetails from './challengeDetails';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  auth,
  form,
  info,
  challenges,
  global,
  challengeDetails
});
