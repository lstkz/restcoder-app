import React, {PropTypes} from 'react';
import styles from './ForgotPasswordForm.scss';
import {reduxForm} from 'redux-form';
import {Button} from 'react-bootstrap';
import validate from './ForgotPasswordFormValidator';
import classNames from 'classnames';
import {FormControlIcon} from '../../';
const fields = ['email'];


@reduxForm({ form: 'forgotPassword', fields, validate })
export default class ForgotPasswordForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const {openModal, fields: { email }, handleSubmit, submitting, error } = this.props;
    return (

    <form role="form" onSubmit={handleSubmit}>
      <FormControlIcon {...email} type="text" icon="fui-mail" name="email" placeholder="Enter your email"/>
      <Button bsStyle="primary" bsSize="large" block disabled={submitting}>Submit</Button>

      <div className="text-center mtl">
        <a onClick={() => openModal('login')}>Log in</a> &nbsp; | &nbsp; <a onClick={() => openModal('register')}>Sign up</a>
      </div>
    </form>
    );
  }
}
