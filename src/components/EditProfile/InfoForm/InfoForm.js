import React, { PropTypes } from 'react';
import styles from './InfoForm.scss';
import { reduxForm } from 'redux-form';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import classNames from 'classnames';
const fields = [ 'fullName', 'quote'];

@reduxForm({form: 'login', fields, validate: () => []}, (state) => state.editProfile.user)
export default class InfoForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const { fields: { fullName, quote }, handleSubmit, submitting, error } = this.props;

    return (
      <div className={styles.InfoForm}>
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="fullName">
            <ControlLabel>Full Name</ControlLabel>
            <FormControl {...fullName} maxLength="50" type="text" placeholder="Full Name" />
          </FormGroup>
          <FormGroup controlId="quote">
            <ControlLabel>Quote (0/255)</ControlLabel>
            <FormControl {...quote} rows="5" maxLength="255" componentClass="textarea" />
          </FormGroup>
          <div className={classNames('form-group', {'has-error': error})}>
            {error && <div className="help-block">{error}</div>}

            <button className="btn btn-inverse" disabled={submitting}>Save Changes</button>
          </div>
        </form>
      </div>
    );
  }
}
