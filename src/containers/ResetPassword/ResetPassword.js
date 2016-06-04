import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {initialize} from 'redux-form';
import styles from './ResetPassword.scss';
import {ResetPasswordForm, PageTitle} from '../../components';
import {handleResetPasswordSubmit} from '../../redux/modules/auth';
import {App} from '../';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: () => {
    return Promise.resolve();
  }
}])
@connect((state) => state, { initialize })
export default class ResetPassword extends React.Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    routeParams: PropTypes.object.isRequired,
  };

  onSubmit(values, dispatch) {
    values.code = this.props.routeParams.code;
    return handleResetPasswordSubmit(values, dispatch);
  }

  render() {
    return (
      <App>
        <Helmet title="Reset Password" />
        <div className={'container ' + styles.ResetPassword}>
          <PageTitle>Reset Password</PageTitle>
          <div className="row">
            <div className="col-md-offset-2 col-md-6">
              <ResetPasswordForm onSubmit={::this.onSubmit}/>
            </div>
          </div>
        </div>
      </App>
    );
  }
}
