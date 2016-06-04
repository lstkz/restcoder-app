import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import styles from './Register.scss';
import {initialize} from 'redux-form';
import {App} from '../';
import {RegisterForm, PageTitle} from '../../components';
import {handleRegisterSubmit} from '../../redux/modules/auth';
import Helmet from 'react-helmet';

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
        <Helmet title="Ranking" />
        <div className={'container ' + styles.Register}>
          <PageTitle>Register</PageTitle>
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
