import React, { PropTypes } from 'react';
import styles from './UserPhoto.scss';

export default class UserPhoto extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    size: PropTypes.number.isRequired,
  };

  render() {
    const {user, size} = this.props;
    const className = `${styles.UserPhoto} ${styles['size' + size]}`;
    if (!user.picture) {
      return (
        <div className={className} style={{backgroundColor: user.icon.bgColor}}>
          {user.icon.text}
        </div>
      );
    }
    return (
      <img className={className} src={'http://localhost:4567' + user.picture}>
      </img>
    );
  }
}
