import React, {PropTypes} from 'react';
import styles from './ForgotPasswordForm.scss';
import {reduxForm} from 'redux-form';
import validate from './ForgotPasswordFormValidator';
import classNames from 'classnames';
import {FormControl} from '../../components';
const fields = ['email'];


@reduxForm({ form: 'forgotPassword', fields, validate })
export default class RegisterForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const { fields: { email }, handleSubmit, submitting, error } = this.props;
    return (
      <div className={styles.ForgotPasswordForm}>
        <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
          <FormControl {...email} name="email" label="Email" type="text" placeholder="Email"/>
          <div className={classNames('form-group', {'has-error': error})}>
            <div className="col-lg-offset-2 col-lg-10">
              {error && <div className="help-block">{error}</div>}
              <button type="submit" className="btn btn-primary center-block" disabled={submitting}>Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
