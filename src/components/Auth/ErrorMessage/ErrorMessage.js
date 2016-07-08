import React, { PropTypes } from 'react';
import styles from './ErrorMessage.scss';

export default class ErrorMessage extends React.Component {
  static propTypes = {
    children: PropTypes.string,
  };

  render() {
    const {children} = this.props;
    if (!children) {
      return null;
    }
    return (
      <div className={styles.ErrorMessage}>
        {children}
      </div>
    );
  }
}
