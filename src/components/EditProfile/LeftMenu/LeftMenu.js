import React, { PropTypes } from 'react';
import styles from './LeftMenu.scss';
import {UserPhoto} from '../../';
import {Link} from 'react-router';

export default class LeftMenu extends React.Component {
  static propTypes = {
    selectedTab: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    removePicture: PropTypes.func.isRequired,
    updatePicture: PropTypes.func.isRequired,
  };

  handleFile(e) {
    const file = e.target.files[0];
    const {updatePicture} = this.props;
    if (!file) {
      return;
    }
    updatePicture(file);
  }

  render() {
    const {user, removePicture, selectedTab} = this.props;

    return (
      <div className={styles.LeftMenu}>
        <input className="hidden" type="file" ref="file" onChange={::this.handleFile}/>
        <div className="text-center">
          <div className="row">
            <div className="col-xs-12 hidden-xs mbl">
              <UserPhoto user={user} size={128} />
            </div>
          </div>
          <ul className="list-group">
            <a onClick={() => this.refs.file.click()} className="list-group-item">Change Picture</a>
            {user.picture && <a onClick={removePicture} className="list-group-item">Remove Picture</a>}
            {selectedTab !== 'info' && <Link to="/edit-profile" className="list-group-item">Change Info</Link>}
            {selectedTab !== 'email' && <Link to="/edit-profile/email" className="list-group-item">Change Email</Link>}
            {selectedTab !== 'password' && <Link to="/edit-profile/password" className="list-group-item">Change Password</Link>}
          </ul>
        </div>
      </div>
    );
  }
}
