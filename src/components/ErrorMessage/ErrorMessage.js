import React, {PropTypes} from 'react';
import styles from './ErrorMessage.scss';
import classNames from 'classnames';

export default class ErrorMessage extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    clearError: PropTypes.func
  };


  render() {
    const { error, clearError } = this.props;
    if (!error) {
      return null;
    }
    return (
      <div className={styles.ErrorMessage} onClick={clearError}>
        <div className={classNames('dialog dialog-danger')}>
          {error.toString()}
        </div>
      </div>
    );
  }
}
