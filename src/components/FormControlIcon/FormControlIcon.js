import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styles from './FormControlIcon.scss';
import classNames from 'classnames';
import {Overlay, Tooltip} from 'react-bootstrap';

export default class FormControlIcon extends React.Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
  };

  render() {
    const {icon, name, type, placeholder, ...values} = this.props;
    const error = values.touched && values.error;
    const tooltip = <Tooltip>{error}</Tooltip>;
    return (
      <div ref="target" className={classNames('form-group', styles.FormControlIcon, {[styles.error]: error})}>
        <Overlay animation={false} show={!!error} container={this} target={() => ReactDOM.findDOMNode(this.refs.target)}>
          {tooltip}
        </Overlay>
        <input type={type} className={classNames('form-control', styles.control)} id={name} placeholder={placeholder} {...values}/>
        <label className={classNames(icon, styles.icon)} htmlFor={name}/>
        {error && <div className="help-block visible-xs">{error}</div>}
      </div>
    );
  }
}
