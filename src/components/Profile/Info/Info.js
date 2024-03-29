import React, { PropTypes } from 'react';
import moment from 'moment';
import styles from './Info.scss';

export default class ProfileInfo extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const {user} = this.props;

    return (
      <div className={styles.Info}>

        <div style={{backgroundColor: '#f44336'}}
              className={`${styles.UserIcon}`}>
          <span>T</span>
        </div>


        <div className="rank">
          <h2>{user.rank}</h2>
          Rank
        </div>

        {/* <h5>Country</h5>
        <h6>Poland</h6>*/}

        <h5>Joined</h5>
        <h6>{moment(user.createdAt).format('MM/DD/YYYY')}</h6>

        <h5>Score</h5>
        <h6>{user.stats.score}</h6>

        <h5>Solved problems</h5>
        <h6>{user.stats.solvedProblems}</h6>

        <h5>Submissions</h5>
        <h6>{user.stats.submissions}</h6>

        {/*<a>Edit profile</a>*/}
      </div>
    );
  }
}
