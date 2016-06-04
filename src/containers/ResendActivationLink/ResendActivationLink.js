import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {initialize} from 'redux-form';
import styles from './ResendActivationLink.scss';
import {ForgotPasswordForm, PageTitle} from '../../components';
import {handleResendActivationLinkSubmit} from '../../redux/modules/auth';
import {App} from '../';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: () => {
    return Promise.resolve();
  }
}])
@connect((state) => state, { initialize })
export default class ResendActivationLink extends React.Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired
  };

  render() {
    return (
    <App>
      <Helmet title="Resend Activation Link" />
      <div className={'container ' + styles.ResendActivationLink}>
        <PageTitle>Resend Activation Link</PageTitle>
        <div className="row">
          <div className="col-md-offset-2 col-md-6">
            <ForgotPasswordForm onSubmit={handleResendActivationLinkSubmit}/>
          </div>
        </div>
      </div>
    </App>
    );
  }
}
