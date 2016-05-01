import React, { PropTypes } from 'react';
import styles from './LoginForm.scss';
import { reduxForm } from 'redux-form';
import validate from './LoginFormValidator';
import ApiClient from '../../helpers/ApiClient';
import {loggedIn} from '../../redux/modules/auth';
import classNames from 'classnames';
import {FormControl} from 'components';
import { push } from 'react-router-redux';
const apiClient = new ApiClient();
const fields = [ 'username', 'password'];


const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    apiClient.post('/login', {data: {...values, cookie: true}})
      .then((result) => {
        dispatch(loggedIn(result));
        dispatch(push('/'));
      })
      .catch((result) => {
        reject({_error: result.error || 'Unexpected error occurred'});
      });
  });
};

@reduxForm({form: 'login', fields, validate})
export default class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const { fields: { username, password }, handleSubmit, submitting, error } = this.props;
    return (
      <div className={styles.LoginForm}>
        <form className="form-horizontal login-form" role="form" onSubmit={handleSubmit(submit)}>
          <FormControl {...username} name="username" label="Username" type="text" placeholder="Username"/>
          <FormControl {...password} name="password" label="Password" type="password" placeholder="Password"/>
          <div className={classNames('form-group', {'has-error': error})}>
            <div className="col-lg-offset-2 col-lg-10">
              {error && <div className="help-block">{error}</div>}
              <button type="submit" className="btn btn-primary center-block" disabled={submitting}>Sign in</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
