import Joi from 'joi';

export default values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  } else if (Joi.validate(values.password, Joi.string().min(4)).error) {
    errors.password = 'Minimum 4 characters';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (Joi.validate(values.email, Joi.string().email()).error) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
