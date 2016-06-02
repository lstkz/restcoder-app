import React, { PropTypes } from 'react';
import styles from './FormControl.scss';
import classNames from 'classnames';

export default class FormControl extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    vertical: PropTypes.bool,
  };

  render() {
    const {label, name, vertical, type, placeholder, ...values} = this.props;

    return (
      <div className={classNames(styles.FormControl, 'form-group', {'has-error': values.touched && values.error})}>
        <label htmlFor={name} className={`${!vertical ? 'col-lg-2 ' : '' } control-label`}>{label}</label>
        <div className={`${!vertical ? 'col-lg-10 ' : ''}`}>
          <input type={type} className="form-control" id={name} placeholder={placeholder} {...values}/>
          {values.touched && values.error && <div className="help-block">{values.error}</div>}
        </div>
      </div>
    );
  }
}
