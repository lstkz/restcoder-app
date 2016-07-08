import React, { PropTypes } from 'react';
import {Button} from 'react-bootstrap';
import { reduxForm } from 'redux-form';
import {ErrorMessage} from '../';
import {FormControlIcon} from '../../';
import validate from './UsernameFormValidator';
const fields = [ 'username'];


@reduxForm({form: 'username', fields, validate})
export default class LoginForm extends React.Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    error: PropTypes.string,
  };

  render() {
    const { fields: { username }, handleSubmit, submitting, error } = this.props;
    return (
      <form role="form" onSubmit={handleSubmit}>
        <FormControlIcon {...username} type="text" icon="fui-user" name="username" placeholder="Enter your username"/>
        <Button type="submit" bsStyle="primary" bsSize="large" block disabled={submitting}>Submit</Button>
        <ErrorMessage>{error}</ErrorMessage>
      </form>
    );
  }
}
