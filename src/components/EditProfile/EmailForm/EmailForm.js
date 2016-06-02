import React, {PropTypes} from 'react';
import styles from './EmailForm.scss';
import {reduxForm} from 'redux-form';
import {FormControl} from '../../';
import classNames from 'classnames';
import validate from './EmailFormValidator';
const fields = ['email', 'password'];

@reduxForm({ form: 'changeEmail', fields, validate })
export default class EmailForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const { fields: { email, password }, handleSubmit, submitting, error, user} = this.props;

    return (
      <div className={styles.InfoForm}>
        <form role="form" onSubmit={handleSubmit}>
          <FormControl {...email} vertical name="email" label="Email" type="text" placeholder="Email address"/>
          <FormControl {...password} vertical name="password" label="Current Password" type="password" placeholder="Password"/>

          <div className={classNames('form-group', {'has-error': error})}>
            {error && <div className="help-block">{error}</div>}

            <button className="btn btn-inverse" disabled={submitting}>Save Changes</button>
          </div>
        </form>
        {user.changeEmail && <p>
          Please check your new email <strong>{user.changeEmail}</strong> and click on confirmation link.
        </p>}
      </div>
    );
  }
}
