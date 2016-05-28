import React, { PropTypes } from 'react';
import styles from './UserIcon.scss';
import {Link} from 'react-router';

export default class UserIcon extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (
      <Link to={`/profile/${user.username}`}>
          <span className={styles.UserIcon} style={{backgroundColor: user['icon:bgColor']}} title="">{user['icon:text']}</span>
      </Link>
    );
  }
}
