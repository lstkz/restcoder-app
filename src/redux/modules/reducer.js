import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import auth from './auth';
import challenges from './challenges';
import global from './global';
import challengeDetails from './challengeDetails';
import ranking from './ranking';

export default combineReducers({
  routing: routeReducer,
  reduxAsyncConnect,
  form,
  auth,
  challenges,
  global,
  challengeDetails,
  ranking
});
