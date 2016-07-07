import React, { PropTypes } from 'react';
import styles from './LoginModal.scss';
import {Button} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import classNames from 'classnames';
import {ShortModal, FormControlIcon} from '../';
import validate from './LoginFormValidator';
const fields = [ 'username', 'password'];

@reduxForm({form: 'login', fields, validate})
export default class LoginModal extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const { fields: { username, password }, handleSubmit, submitting, error } = this.props;
    return (
      <ShortModal show onHide={() => {}} title="Log in to RestCoder">
        <form>
          <FormControlIcon {...username} type="text" icon="fui-user" name="username" placeholder="Enter your username"/>
          <FormControlIcon {...password} type="password" icon="fui-lock" name="password" placeholder="Enter your password"/>
          <a className={styles.forgotLink}>
            Forgot password?
          </a>
          <Button bsStyle="primary" bsSize="large" block>Log In</Button>

          <div className={styles.or}>
            <hr/>
            <span>or</span>
            <hr/>
          </div>

          <div className={styles.social}>
            <a className={styles.socialBtnFB}><i className="fa fa-facebook"/><span>Facebook</span></a>
            <a className={styles.socialBtnG}><i className="fa fa-google-plus"/><span>Google</span></a>
            <a className={styles.socialBtnGH}><i className="fa fa-github"/><span>Github</span></a>
          </div>

          <div className="text-center mtl">
            Don't have an account? <a>Sign up</a>
          </div>
        </form>
      </ShortModal>
    );
  }
}
