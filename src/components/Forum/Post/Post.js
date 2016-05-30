import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import styles from './Post.scss';
import UserIcon from '../UserIcon/UserIcon';
import Permalink from '../Permalink/Permalink';
import {Link} from 'react-router';
import {Dropdown, MenuItem} from 'react-bootstrap';

export default class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    topic: PropTypes.object.isRequired,
    focus: PropTypes.bool.isRequired,
    replyPost: PropTypes.func.isRequired,
    quotePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    children: PropTypes.any,
  };

  componentDidMount() {
    if (this.props.focus) {
      this.setFocus();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.focus && !this.props.focus) {
      this.setFocus();
    }
  }

  onOptionSelect(key) {
    const {editPost, post, topic} = this.props;
    if (key === 'edit') {
      editPost(post, topic);
    }
  }

  setFocus() {
    setTimeout(() => ReactDOM.findDOMNode(this.refs.post).scrollIntoView());
  }

  render() {
    const { children, post, replyPost, quotePost, topic, focus } = this.props;
    const { user } = post;

    return (
      <div className={`${styles.Post} ${focus ? styles.highlight : ''}`} ref="post">
        <div className={`clearfix ${styles.postHeader}`}>
          <div className="pull-left">
            <UserIcon large user={user}/>
          </div>

          <small className="pull-left mlm">
            <strong className="mrm">
              <Link to={`/profile/${user.username}`}>{user.username}</Link>
            </strong>

            {user.groupTitle && <small className="mrm label group-label inline-block"
                                       style={{backgroundColor: user.selectedGroup.labelColor}}>{user.groupTitle}</small>}

            <Permalink to={`/post/${post.pid}`} time={post.timestampISO}/>
            <span className={styles.bookmarked}><i className="fa fa-bookmark-o"/></span>
          </small>
        </div>

        <br/>

        <div className={styles.content} dangerouslySetInnerHTML={{__html: post.content}}>
        </div>

        <div className="clearfix">
          <small className="pull-right">
            <span>
              <a onClick={() => replyPost(post, topic)}>reply</a> &nbsp; <a
              onClick={() => quotePost(post, topic)}>quote</a>
            </span>

            {post.display_moderator_tools && <Dropdown id="tools">
              <a bsRole="toggle" className={styles.options}>
                <i className="fa fa-fw fa-ellipsis-v"/>
              </a>
              <Dropdown.Menu onSelect={::this.onOptionSelect}>
                <MenuItem eventKey="edit">
                  <span className={styles.menuIcon}><i className="fa fa-pencil"/></span>
                  Edit
                </MenuItem>
                {/*<MenuItem eventKey="delete">
                  <span className={styles.menuIcon}><i className="fa fa-trash-o"/></span>
                  Delete
                </MenuItem>*/}
              </Dropdown.Menu>
            </Dropdown>}
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
