import React, { PropTypes } from 'react';
import styles from './RegisterForm.scss';
import { reduxForm } from 'redux-form';
import validate from './RegisterFormValidator';
import classNames from 'classnames';
import {FormControl} from 'components';
const fields = [ 'username', 'email', 'password'];


@reduxForm({form: 'register', fields, validate})
export default class RegisterForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const { fields: { username, password, email }, handleSubmit, submitting, error } = this.props;
    return (
      <div className={styles.LoginForm}>
        <form className="form-horizontal register-form" role="form" onSubmit={handleSubmit}>
          <FormControl {...username} name="username" label="Username" type="text" placeholder="Username"/>
          <FormControl {...email} name="email" label="Email" type="text" placeholder="Email"/>
          <FormControl {...password} name="password" label="Password" type="password" placeholder="Password"/>
          <div className={classNames('form-group', {'has-error': error})}>
            <div className="col-lg-offset-2 col-lg-10">
              {error && <div className="help-block">{error}</div>}
              <button type="submit" className="btn btn-primary center-block" disabled={submitting}>Register</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
