import React, {PropTypes} from 'react';
import styles from './ContactForm.scss';
import {reduxForm} from 'redux-form';
import validate from './ContactFormValidator';
import classNames from 'classnames';
import {FormControl} from '../../components';
const fields = ['subject', 'email', 'message'];


@reduxForm({ form: 'contact', fields, validate })
export default class ContactForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    isEmailRequired: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const { fields: { email, subject, message }, handleSubmit, submitting, error, isEmailRequired } = this.props;
    return (
      <div className={styles.ForgotPasswordForm}>
        <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
          <FormControl {...subject} name="subject" label="Subject" type="text" placeholder="Subject"/>
          {isEmailRequired && <FormControl {...email} name="email" label="Email" type="text" placeholder="Your email address"/>}
          <FormControl {...message} name="message" label="Message" type="textarea"/>
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
