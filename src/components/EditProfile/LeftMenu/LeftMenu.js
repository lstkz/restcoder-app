import React, { PropTypes } from 'react';
import styles from './LeftMenu.scss';
import {UserPhoto} from '../../';

export default class LeftMenu extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (
      <div className={styles.LeftMenu}>
        <div className="text-center">
          <div className="row">
            <div className="col-xs-12 hidden-xs mbl">
              <UserPhoto user={user} size={128} />
            </div>
          </div>
          <ul className="list-group">
            <a id="changePictureBtn" href="#" className="list-group-item">Change Picture</a>
            <a href="/user/sky/edit/username" className="list-group-item">Change Username</a>
            <a href="/user/sky/edit/email" className="list-group-item">Change Email</a>
            <a href="/user/sky/edit/password" className="list-group-item">Change Password</a>
          </ul>
        </div>
      </div>
    );
  }
}
