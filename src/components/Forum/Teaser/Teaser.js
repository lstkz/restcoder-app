import React, {PropTypes} from 'react';
import styles from './Teaser.scss';
import UserIcon from '../UserIcon/UserIcon';
import Permalink from '../Permalink/Permalink';

export default class Teaser extends React.Component {
  static propTypes = {
    teaser: PropTypes.object,
    color: PropTypes.string,
    emptyText: PropTypes.string.isRequired
  };

  renderBody() {
    const {teaser, emptyText} = this.props;
    if (!teaser) {
      return <p>{emptyText}</p>;
    }
    return (
      <div>
        <p>
          <UserIcon user={teaser.user} />
          &nbsp;
          <Permalink time={teaser.timestampISO} to={`/post/${teaser.pid}`} />
        </p>
        <div className={styles.postContent} dangerouslySetInnerHTML={{__html: teaser.content}}>
        </div>
      </div>
    );
  }

  render() {
    const {color} = this.props;
    return (
      <div className={styles.Teaser} style={{borderColor: color}}>
        <div className={styles.inner}>
          {this.renderBody()}
        </div>
      </div>
    );
  }
}
