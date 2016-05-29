import React, {PropTypes} from 'react';
import styles from './Post.scss';
import UserIcon from '../UserIcon/UserIcon';
import Permalink from '../Permalink/Permalink';
import {Link} from 'react-router';

export default class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    replyPost: PropTypes.func.isRequired,
    quotePost: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  render() {
    const {children, post, replyPost, quotePost, topic} = this.props;
    const {user} = post;

    return (
      <div className={styles.Post}>

        <div className={`clearfix ${styles.postHeader}`}>
          <div className="pull-left">
            <UserIcon large user={user} />
          </div>

          <small className="pull-left mlm">
            <strong className="mrm">
              <Link to={`/profile/${user.username}`} >{user.username}</Link>
            </strong>

            {user.groupTitle && <small className="mrm label group-label inline-block" style={{backgroundColor: user.selectedGroup.labelColor}}>{user.groupTitle}</small>}

            <Permalink to={`/post/${post.pid}`} time={post.timestampISO} />
          </small>
        </div>

        <br/>

        <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content}}>
        </div>

        <div className="clearfix">
          <small className="pull-right">
            <span>
              <a onClick={() => replyPost(post, topic)}>reply</a> &nbsp; <a onClick={() => quotePost(post, topic)}>quote</a>
            </span>
          </small>
        </div>

        <hr/>

        <div className="post-bar">
          {children}
        </div>
      </div>
    );
  }
}
