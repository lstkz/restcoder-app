import React, {PropTypes} from 'react';
import styles from './Teaser.scss';
import UserIcon from '../UserIcon/UserIcon';
import Permalink from '../Permalink/Permalink';

export default class Teaser extends React.Component {
  static propTypes = {
    post: PropTypes.object,
    teaser: PropTypes.object,
    color: PropTypes.string.isRequired,
  };

  renderBody() {
    const {post, teaser} = this.props;
    if (!post) {
      return <p>No new posts.</p>;
    }
    return (
      <div>
        <p>
          <UserIcon user={post.user} />
          &nbsp;
          <Permalink time={teaser.timestampISO} to={teaser.url} />
        </p>
        <div className={styles.postContent} dangerouslySetInnerHTML={{__html: post.content}}>
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
