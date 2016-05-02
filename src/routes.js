import React from 'react';
import {Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    Landing,
    NotFound,
    Login,
    ChallengeDetails,
    Register,
  } from 'containers';

export default (store) => {

  const redirectToHome = (nextState, replace, cb) => {
    const { auth: { user }} = store.getState();
    if (user) {
      replace('/home');
    }
    cb();
  };

  const loadInitialState = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(() => cb());
    } else {
      cb();
    }
  };

  return (
    <Route onEnter={loadInitialState}>
       <Route path="/" onEnter={redirectToHome} component={Landing}/>
       <Route path="/home" component={Home}/>
       <Route path="/login" onEnter={redirectToHome} component={Login}/>
       <Route path="/register" onEnter={redirectToHome} component={Register}/>
       <Route path="/challenge/:id" component={ChallengeDetails}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
