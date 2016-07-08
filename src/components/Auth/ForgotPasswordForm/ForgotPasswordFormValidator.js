import Joi from 'joi';

export default values => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (Joi.validate(values.email, Joi.string().email()).error) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
