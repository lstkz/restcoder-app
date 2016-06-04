import React from 'react';
import {App} from '../';
import {asyncConnect} from 'redux-async-connect';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: () => Promise.resolve()
}])
export default class NotFound extends React.Component {
  render() {
    return (
      <App>
        <Helmet title="Not found" />
        <div className="container text-center">
          <h1>Doh! 404!</h1>
          <p>This page doesn't exist</p>
        </div>
      </App>
    );
  }
}
