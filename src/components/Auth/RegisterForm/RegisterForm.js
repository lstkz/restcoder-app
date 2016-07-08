import React, { PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import {SocialAuth, ErrorMessage} from '../';
import {FormControlIcon} from '../../';
import validate from './RegisterFormValidator';
const fields = [ 'username', 'email', 'password'];


@reduxForm({form: 'register', fields, validate})
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
    const { openModal, socialAuth, fields: { username, email, password }, handleSubmit, submitting, error, socialError } = this.props;
    return (
      <form role="form" onSubmit={handleSubmit}>
        <FormControlIcon {...username} type="text" icon="fui-user" name="username" placeholder="Enter your username"/>
        <FormControlIcon {...email} type="text" icon="fui-mail" name="email" placeholder="Enter your email"/>
        <FormControlIcon {...password} type="password" icon="fui-lock" name="password" placeholder="Enter your password"/>
        <Button type="submit" bsStyle="primary" bsSize="large" block disabled={submitting}>Sign Up</Button>
        <ErrorMessage>{error || socialError}</ErrorMessage>
        <SocialAuth socialAuth={socialAuth} />

        <div className="text-center mtl">
          Have an account? <a onClick={() => openModal('login')}>Log in</a>
        </div>
      </form>
    );
  }
}
