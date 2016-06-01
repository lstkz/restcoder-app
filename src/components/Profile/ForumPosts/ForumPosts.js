import React, { PropTypes } from 'react';
import styles from './ForumPosts.scss';
import {Link} from 'react-router';
import TimeAgo from '../../Forum/TimeAgo/TimeAgo';

export default class ForumPosts extends React.Component {
  static propTypes = {
    forumPosts: PropTypes.object.isRequired,
  };

  render() {
    const {forumPosts} = this.props;
    const {posts} = forumPosts;
    if (!posts.length) {
      return (
        <h3 className="text-center mvl">No forum posts...</h3>
      );
    }
    return (
      <div className={styles.ForumPosts}>

        {posts.map((post) =>
          <div key={post.pid}>
            <Link className={styles.topicTitle} to={`/post/${post.pid}`}>
              {post.isMainPost ? '' : 'RE:' }
              {post.topic.title}
            </Link>

            <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content}}>
            </div>

            <small className={styles.topicCategory}>
              <Link to={`/category/${post.category.slug}`}>
                POSTED IN <span dangerouslySetInnerHTML={{__html: post.category.name}}/>
              </Link>
              <br/>
              <TimeAgo isoDate={post.timestampISO}/>
            </small>
            <hr/>
          </div>
        )}
      </div>
    );
  }
}
