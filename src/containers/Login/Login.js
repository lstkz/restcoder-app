import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {initialize} from 'redux-form';
import {LoginForm} from '../../components';
import {App} from '../';
import {handleLoginSubmit} from '../../redux/modules/auth';

@asyncConnect([{
  promise: () => {
    return Promise.resolve();
  }
}])
@connect(state => state, { initialize })
export default class Login extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  };

  render() {
    const styles = require('./Login.scss');

    return (
      <App>
        <div className={'container ' + styles.Login}>
          <div className="row">
            <div className="col-md-offset-2 col-md-6">
              <LoginForm onSubmit={handleLoginSubmit}/>
            </div>
          </div>
        </div>
      </App>
    );
  }
}
