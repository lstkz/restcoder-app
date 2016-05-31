import React, {PropTypes} from 'react';
import styles from './UserIcon.scss';
import {Link} from 'react-router';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

export default class UserIcon extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    large: PropTypes.bool
  };

  render() {
    const { user, large } = this.props;

    return (
      <OverlayTrigger trigger={['hover', 'focus']} id="trigger" placement="top" overlay={<Tooltip id="username">{user.username}</Tooltip>}>
        <Link to={`/profile/${user.username}`}
              style={{backgroundColor: user['icon:bgColor']}}
              className={`${styles.UserIcon} ${large ? styles.large : ''}`}>
          <span>{user['icon:text']}</span>
        </Link>
      </OverlayTrigger>
    );
  }
}
