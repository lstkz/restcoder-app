import Joi from 'joi';

export default values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (Joi.validate(values.username, Joi.string().alphanum()).error) {
    errors.username = 'Must contain only letters and digits';
  } else if (Joi.validate(values.username, Joi.string().min(3)).error) {
    errors.username = 'Minimum 3 characters';
  } else if (Joi.validate(values.username, Joi.string().max(12)).error) {
    errors.username = 'Maximum 12 characters';
  }
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