import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import styles from './Register.scss';
import {initialize} from 'redux-form';
import {App} from '../';
import {RegisterForm} from '../../components';
import {handleRegisterSubmit} from '../../redux/modules/auth';

@asyncConnect([{
  promise: () => {
    return Promise.resolve();
  }
}])
@connect(state => state, { initialize })
export default class Register extends React.Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  };

  render() {
    return (
      <App>
        <div className={'container ' + styles.Register}>
          <div className="row">
            <div className="col-md-offset-2 col-md-6">
              {<RegisterForm onSubmit={handleRegisterSubmit}/>}
            </div>
          </div>
        </div>
      </App>
    );
  }
}
