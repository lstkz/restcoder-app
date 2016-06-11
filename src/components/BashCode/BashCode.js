import React, { PropTypes } from 'react';
import styles from './BashCode.scss';

export default class BashCode extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    const {children} = this.props;
    return (
      <pre className={styles.BashCode}>
        <code>
          <span className="nv">$ </span>{children}
        </code>
      </pre>
    );
  }
}
