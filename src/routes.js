import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  isLoaded as isAuthLoaded,
  load as loadAuth,
  verifyEmail as verifyEmailAction,
  changeEmail as changeEmailAction,
} from './redux/modules/auth';
import { setError } from './redux/modules/global';

import {
  Home,
  NewLanding,
  NotFound,
  ChallengeDetails,
  Ranking,
  Profile,
  Forum,
  ForumCategory,
  ForumTopic,
  ForumUnread,
  EditProfile,
  ForgotPassword,
  ResetPassword,
  ResendActivationLink,
  Help,
  Contact,
  Tutorial,
} from './containers';

export default (store, client) => {
  const redirectToHome = (nextState, replace, cb) => {
    const { auth: { user } } = store.getState();
    if (user) {
      replace('/home');
    }
    cb();
  };

  const requireAuth = (nextState, replace, cb) => {
    const { auth: { user } } = store.getState();
    if (!user) {
      replace('/login');
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

  const changeEmail = (nextState, replace, cb) => {
    const done = (result) => {
      replace({
        pathname: '/home',
        query: {
          error: result && result.error,
        },
      });
      cb();
    };
    store.dispatch(changeEmailAction(nextState.params.code))
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

  const redirectForumUserId = (nextState, replace, cb) => {
    client.get('/forum-user/' + nextState.params.id)
      .then((result) => {
        replace('/profile/' + result.username);
        cb();
      })
      .catch(_handleError(cb));
  };

  return (
    <Route onEnter={loadInitialState}>
      <Route path="/" onEnter={redirectToHome} component={NewLanding} />
      <Route path="/home">
        <IndexRoute component={Home} />
        <Route path="/challenge/:id" component={ChallengeDetails} />
      </Route>
      <Route path="/ranking" component={Ranking} />
      <Route path="/verify-email/:code" onEnter={verifyEmail} />
      <Route path="/change-email/:code" onEnter={changeEmail} />
      <Route path="/profile/:username" component={Profile} />
      <Route path="/edit-profile" onEnter={requireAuth} component={EditProfile} />
      <Route path="/edit-profile/:type" onEnter={requireAuth} component={EditProfile} />
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
      <Route path="/uid/:id" onEnter={redirectForumUserId} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password/:code" component={ResetPassword} />
      <Route path="/activation-link" component={ResendActivationLink} />
      <Route path="/contact" component={Contact} />
      <Route path="/tutorial" component={Tutorial} />
      <Route path="/help">
        <IndexRoute component={Help} />
        <Route path="/help/:topic" component={Help} />
        <Route path="/help/:topic/:subtopic" component={Help} />
      </Route>
      <Route path="/404" component={NotFound} status={404} />

      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
