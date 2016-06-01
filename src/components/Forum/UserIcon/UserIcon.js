import React, {PropTypes} from 'react';
import styles from './UserIcon.scss';
import {Link} from 'react-router';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';

export default class UserIcon extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    large: PropTypes.bool
  };

  renderPhoto() {
    const { user, large } = this.props;
    if (!user.picture) {
      return (
        <Link to={`/profile/${user.username}`}
              style={{backgroundColor: user['icon:bgColor']}}
              className={`${styles.UserIcon} ${large ? styles.large : ''}`}>
          <span>{user['icon:text']}</span>
        </Link>
      );
    }
    return (
      <Link to={`/profile/${user.username}`}>
        <img className={`${styles.UserIcon} ${large ? styles.large : ''}`} src={user.picture} />
      </Link>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <OverlayTrigger trigger={['hover', 'focus']} id="trigger" placement="top" overlay={<Tooltip id="username">{user.username}</Tooltip>}>
        {this.renderPhoto()}
      </OverlayTrigger>
    );
  }
}
