import React, {PropTypes} from 'react';
import styles from './PasswordForm.scss';
import {reduxForm} from 'redux-form';
import {FormControl} from '../../';
import classNames from 'classnames';
import validate from './PasswordFormValidator';
const fields = ['password', 'newPassword'];

@reduxForm({ form: 'changePassword', fields, validate })
export default class EmailForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    isPasswordChanged: PropTypes.bool,
    error: PropTypes.string
  };

  render() {
    const { fields: { newPassword, password }, handleSubmit, submitting, error, isPasswordChanged} = this.props;

    return (
      <div className={styles.PasswordForm}>
        <form role="form" onSubmit={handleSubmit}>
          <FormControl {...password} vertical name="password" label="Current Password" type="password" placeholder="Password"/>
          <FormControl {...newPassword} vertical name="newPassword" label="New Password" type="password" placeholder="New Password"/>

          <div className={classNames('form-group', {'has-error': error})}>
            {error && <div className="help-block">{error}</div>}

            <button className="btn btn-inverse" disabled={submitting}>Save Changes</button>
          </div>
        </form>
        {isPasswordChanged && <p>
          Your password has been changed successfully.
        </p>}
      </div>
    );
  }
}
