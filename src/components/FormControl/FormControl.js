import React, { PropTypes } from 'react';
import styles from './FormControl.scss';
import classNames from 'classnames';

export default class FormControl extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string
  };

  render() {
    const {label, name, type, placeholder, ...values} = this.props;

    return (
      <div className={classNames(styles.FormControl, 'form-group', {'has-error': values.touched && values.error})}>
        <label htmlFor={name} className="col-lg-2 control-label">{label}</label>
        <div className="col-lg-10">
          <input type={type} className="form-control" id={name} placeholder={placeholder} {...values}/>
          {values.touched && values.error && <div className="help-block">{values.error}</div>}
        </div>
      </div>
    );
  }
}
