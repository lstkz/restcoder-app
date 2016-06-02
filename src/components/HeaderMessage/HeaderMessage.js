import React, { PropTypes } from 'react';
import styles from './HeaderMessage.scss';

export default class HeaderMessage extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    const {children} = this.props;
    return (
      <div className={styles.HeaderMessage}>
        <div className="dialog dialog-success">
          {children}
        </div>
      </div>
    );
  }
}
