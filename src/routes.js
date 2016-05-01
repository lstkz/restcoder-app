import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Landing,
    NotFound,
    ChallengeDetails,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  const loadInitialState = (nextState, replace, cb) => {
    console.log('loadInitialState');
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(() => cb());
    } else {
      cb();
    }
  };

  const test = (nextState, replace, cb) => {
    console.log('test');
    if (__CLIENT__) {
      return cb();
    }
//    cb();
//    return;
    setTimeout(() => cb(), 2000);
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route onEnter={loadInitialState}>
      { /* Home (main) route */ }
      {/*<IndexRoute component={Landing}/>*/}
       <Route path="/" component={Landing}/>
       <Route path="/home" component={Home}/>
       <Route path="/challenge/:id" component={ChallengeDetails}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
