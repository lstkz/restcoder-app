import React from 'react';
import { Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth, verifyEmail as verifyEmailAction } from './redux/modules/auth';
import { setError } from './redux/modules/global';
import { Home, Landing, NotFound, Login, ChallengeDetails, Register, Ranking, Profile, Forum } from './containers';

export default (store) => {
  const redirectToHome = (nextState, replace, cb) => {
    const { auth: { user } } = store.getState();
    if (user) {
      replace('/home');
    }
    cb();
  };

  const loadInitialState = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState())) {
      const error = nextState.location && nextState.location.query.error;
      if (error) {
        store.dispatch(setError({ error }));
      }
      store.dispatch(loadAuth()).then(() => cb()).catch((err) => {
        if (err && err.stack) {
          console.log(err.stack);
        } else {
          console.log(err);
        }
        store.dispatch({ type: 'FATAL_ERROR' });
        cb();
      });
    } else {
      cb();
    }
  };

  const verifyEmail = (nextState, replace, cb) => {
    const done = (result) => {
      replace({
        pathname: '/home',
        query: {
          error: result && result.error,
        },
      });
      cb();
    };
    store.dispatch(verifyEmailAction(nextState.params.code))
      .then(done)
      .catch(done);
  };

  return (
    <Route onEnter={loadInitialState}>
      <Route path="/" onEnter={redirectToHome} component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/ranking" component={Ranking} />
      <Route path="/login" onEnter={redirectToHome} component={Login} />
      <Route path="/register" onEnter={redirectToHome} component={Register} />
      <Route path="/challenge/:id" component={ChallengeDetails} />
      <Route path="/verify-email/:code" onEnter={verifyEmail} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/forum" component={Forum} />
      <Route path="/404" component={NotFound} status={404} />

      {}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
