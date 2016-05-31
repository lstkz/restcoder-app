import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth, verifyEmail as verifyEmailAction } from './redux/modules/auth';
import { setError } from './redux/modules/global';

import {
  Home,
  Landing,
  NotFound,
  Login,
  ChallengeDetails,
  Register,
  Ranking,
  Profile,
  Profile2,
  Forum,
  ForumCategory,
  ForumTopic,
  ForumUnread,
} from './containers';

export default (store, client) => {
  const redirectToHome = (nextState, replace, cb) => {
    const { auth: { user } } = store.getState();
    if (user) {
      replace('/home');
    }
    cb();
  };

  function _handleError(cb) {
    return (err) => {
      if (err && err.stack) {
        console.log(err.stack);
      } else {
        console.log(err);
      }
      store.dispatch({ type: 'FATAL_ERROR' });
      cb();
    };
  }

  const loadInitialState = (nextState, replace, cb) => {
    if (!isAuthLoaded(store.getState())) {
      const error = nextState.location && nextState.location.query.error;
      if (error) {
        store.dispatch(setError({ error }));
      }
      store.dispatch(loadAuth()).then(() => cb()).catch(_handleError(cb));
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

  const redirectPost = (nextState, replace, cb) => {
    client.get('/forum/post/' + nextState.params.id)
      .then((result) => {
        const operator = result.url.indexOf('?') === -1 ? '?' : '&';
        replace(result.url + operator + 'focus_post=' + nextState.params.id);
        cb();
      })
      .catch(_handleError(cb));
  };

  return (
    <Route onEnter={loadInitialState}>
      <Route path="/" onEnter={redirectToHome} component={Landing} />
      <Route path="/home">
        <IndexRoute component={Home} />
        <Route path="/challenge/:id" component={ChallengeDetails} />
      </Route>
      <Route path="/ranking" component={Ranking} />
      <Route path="/login" onEnter={redirectToHome} component={Login} />
      <Route path="/register" onEnter={redirectToHome} component={Register} />
      <Route path="/verify-email/:code" onEnter={verifyEmail} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/profile2/:username" component={Profile2} />
      <Route path="/forum">
        <IndexRoute component={Forum} />
        <Route path="/category/:id" component={ForumCategory} />
        <Route path="/category/:id/:name" component={ForumCategory} />
        <Route path="/topic/:id" component={ForumTopic} />
        <Route path="/topic/:id/:name" component={ForumTopic} />
        <Route path="/unread" component={ForumUnread} />
        <Route path="/unread/:type" component={ForumUnread} />
        <Route path="/post/:id" onEnter={redirectPost} />
      </Route>
      <Route path="/404" component={NotFound} status={404} />

      {}
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
