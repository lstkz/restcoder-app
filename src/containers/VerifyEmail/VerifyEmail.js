import React from 'react';
import {asyncConnect} from 'redux-async-connect';
import {verifyEmail} from 'redux/modules/auth';
import {push} from 'react-router-redux';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => {
    return dispatch(verifyEmail(params.code))
      .then(() => dispatch(push('/home')))
      .catch(() => dispatch(push('/home')));
  }
}])
export default class VerifyEmail extends React.Component {

  render() {
    return null;
  }
}
