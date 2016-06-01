import React, { PropTypes } from 'react';
import styles from './HeaderInfo.scss';
import StatsNumber from '../../Forum/StatsNumber/StatsNumber';
import TimeAgo from '../../Forum/TimeAgo/TimeAgo';
import {UserPhoto} from '../../';

export default class HeaderInfo extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  renderAvatar() {
    const {user} = this.props;
    if (!user.picture) {
      return (
        <div className={styles.avatarWrapper}>
          <div className={styles.avatar} style={{backgroundColor: user.icon.bgColor}}>
            {user.icon.text}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.avatarWrapper}>
        <img className={styles.avatar} src={'http://localhost:4567' + user.picture}>
        </img>
      </div>
    );
  }

  render() {
    const {user} = this.props;

    return (
      <div className={styles.HeaderInfo}>

        <div className={styles.avatarWrapper}>
          <UserPhoto user={user} size={128} />
        </div>

        <div className={`row ${styles.statsRow}`}>
          <h1 className={styles.fullname}>{user.fullName || user.username}</h1>
          <h1 className={styles.username}>@{user.username}</h1>
          {user.quote && <span className={styles.quote}>
            <p>{user.quote}</p>
          </span>}

          <div className={styles.accountStats}>
            <StatsNumber className={styles.statItem} title="Rank" count={user.rank} />
            <StatsNumber className={styles.statItem} title="Score" count={user.stats.score} />
            <StatsNumber className={styles.statItem} title="Solved problems" count={user.stats.solvedProblems} />
            <StatsNumber className={styles.statItem} title="Submissions" count={user.stats.submissions} />
            <StatsNumber className={styles.statItem} title="Forum posts" count={user.postCount} />
          </div>

          <div className={`text-center ${styles.profileMeta}`}>
            <span>Joined</span>
            &nbsp;
            <strong>
              <TimeAgo isoDate={user.createdAt} />
            </strong>
          </div>
        </div>
      </div>
    );
  }
}
