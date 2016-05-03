import React, { PropTypes } from 'react';
import styles from './FatalError.scss';
import classNames from 'classnames';

export default class FatalError extends React.Component {
  static propTypes = {
    timestamp: PropTypes.string.isRequired
  };

  render() {
    const {timestamp} = this.props;
    return (
      <div className={classNames(styles.FatalError)}>
          <div className="dialog dialog-danger">
            <div className="container">
              <strong>An error occurred.</strong> <br/>
              Please refresh page or try again later. <br/>
              Timestamp: {timestamp}
            </div>
        </div>
      </div>
    );
  }
}
