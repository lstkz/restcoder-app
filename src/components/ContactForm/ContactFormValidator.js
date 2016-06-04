import Joi from 'joi';

export default (values, props) => {
  const errors = {};
  if (props.isEmailRequired) {
    if (!values.email) {
      errors.email = 'Required';
    } else if (Joi.validate(values.email, Joi.string().email()).error) {
      errors.email = 'Invalid email address';
    }
  }
  if (!values.subject) {
    errors.subject = 'Required';
  }
  if (!values.message) {
    errors.message = 'Required';
  }
  return errors;
};
