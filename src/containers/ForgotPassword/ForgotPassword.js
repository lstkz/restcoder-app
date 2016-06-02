import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {initialize} from 'redux-form';
import styles from './ForgotPassword.scss';
import {ForgotPasswordForm, PageTitle} from '../../components';
import {handleForgotPasswordSubmit} from '../../redux/modules/auth';
import {App} from '../';

@asyncConnect([{
  promise: () => {
    return Promise.resolve();
  }
}])
@connect((state) => state, { initialize })
export default class ForgotPassword extends React.Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  };

  render() {
    return (
    <App>
      <div className={'container ' + styles.ForgotPassword}>
        <PageTitle>Forgot Password</PageTitle>
        <div className="row">
          <div className="col-md-offset-2 col-md-6">
            <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit}/>
          </div>
        </div>
      </div>
    </App>
    );
  }
}
