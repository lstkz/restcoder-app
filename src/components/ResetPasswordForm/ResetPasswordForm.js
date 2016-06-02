import React, {PropTypes} from 'react';
import styles from './ResetPasswordForm.scss';
import {reduxForm} from 'redux-form';
import {FormControl} from '../';
import classNames from 'classnames';
import validate from './ResetPasswordFormValidator';
const fields = ['password'];

@reduxForm({ form: 'resetPassword', fields, validate })
export default class EmailForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const { fields: { password }, handleSubmit, submitting, error} = this.props;

    return (
      <div className={styles.PasswordForm}>
        <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
          <FormControl {...password} name="newPassword" label="Password" type="password" placeholder="New Password"/>

          <div className={classNames('form-group', {'has-error': error})}>
            <div className="col-lg-offset-2 col-lg-10">
              {error && <div className="help-block">{error}</div>}
              <button type="submit" className="btn btn-primary center-block" disabled={submitting}>Reset</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
