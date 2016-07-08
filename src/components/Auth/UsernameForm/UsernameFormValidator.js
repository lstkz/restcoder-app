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
  return errors;
};
