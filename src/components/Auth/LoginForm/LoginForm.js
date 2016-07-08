import React, { PropTypes } from 'react';
import styles from './LoginForm.scss';
import {Button} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import {SocialAuth, ErrorMessage} from '../';
import {FormControlIcon} from '../../';
import validate from './LoginFormValidator';
const fields = [ 'username', 'password'];


@reduxForm({form: 'login', fields, validate})
export default class LoginForm extends React.Component {
  static propTypes = {
    openModal: PropTypes.func.isRequired,
    socialAuth: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
    socialError: PropTypes.string,
  };

  render() {
    const { openModal, socialAuth, fields: { username, password }, handleSubmit, submitting, error, socialError } = this.props;
    return (
      <form role="form" onSubmit={handleSubmit}>
        <FormControlIcon {...username} type="text" icon="fui-user" name="username" placeholder="Enter your username"/>
        <FormControlIcon {...password} type="password" icon="fui-lock" name="password" placeholder="Enter your password"/>
        <a onClick={() => openModal('forgotPassword')} className={styles.forgotLink}>
          Forgot password?
        </a>
        <Button type="submit" bsStyle="primary" bsSize="large" block disabled={submitting}>Log In</Button>
        <ErrorMessage>{error || socialError}</ErrorMessage>
        <SocialAuth socialAuth={socialAuth} />

        <div className="text-center mtl">
          Don't have an account? <a onClick={() => openModal('register')}>Sign up</a>
        </div>
      </form>
    );
  }
}
