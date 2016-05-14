import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
// import { routerReducer as router } from 'react-router-redux'
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import { reducer as form } from 'redux-form';
import auth from './auth';
import challenges from './challenges';
import global from './global';
import challengeDetails from './challengeDetails';
import ranking from './ranking';
import profile from './profile';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  auth,
  challenges,
  global,
  challengeDetails,
  ranking,
  profile,
});
