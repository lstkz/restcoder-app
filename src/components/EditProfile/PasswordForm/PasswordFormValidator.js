import Joi from 'joi';

export default values => {
  const errors = {};
  if (!values.password) {
    errors.password = 'Required';
  } else if (Joi.validate(values.password, Joi.string().min(4)).error) {
    errors.password = 'Minimum 4 characters';
  }
  if (!values.newPassword) {
    errors.newPassword = 'Required';
  } else if (Joi.validate(values.newPassword, Joi.string().min(4)).error) {
    errors.newPassword = 'Minimum 4 characters';
  }
  return errors;
};
