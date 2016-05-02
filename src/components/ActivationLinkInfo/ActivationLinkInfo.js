import React, { PropTypes } from 'react';
import styles from './ActivationLinkInfo.scss';

export default class ActivationLinkInfo extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    email: PropTypes.string
  };

  render() {
    const {visible, email} = this.props;
    if (!visible) {
      return null;
    }
    return (
      <div className={styles.ActivationLinkInfo}>
        <div className="dialog dialog-success">
          Activation link was sent to <span className="text-primary">{email}</span>
        </div>
      </div>
    );
  }
}
