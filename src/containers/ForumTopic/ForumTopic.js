import React, {PropTypes} from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import ForumWrapper from '../ForumWrapper/ForumWrapper';
import styles from './ForumTopic.scss';
import * as actions from '../../redux/modules/forum';
import {Post, Breadcrumb, Paginate, TopicToolbar} from '../../components/Forum';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: ({ location, params, store: { dispatch } }) => dispatch(actions.initTopic(params.id, location.query.page))
}])
@connect(state => ({...state.forum, isLoggedIn: state.auth.isLoggedIn}), actions)
export default class ForumTopic extends React.Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
    query: PropTypes.object,
    location: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    replyPost: PropTypes.func.isRequired,
    quotePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
    changeTopicWatching: PropTypes.func.isRequired,
  };

  renderToolbar() {
    const {topic, replyPost, changeTopicWatching, isLoggedIn} = this.props;
    return (
      <div>
        <div className="clearfix">
          <TopicToolbar
            changeTopicWatching={changeTopicWatching}
            replyPost={replyPost}
            className="pull-right"
            isLoggedIn={isLoggedIn}
            topic={topic}/>
        </div>
        <hr/>
      </div>
    );
  }

  render() {
    const {topic, replyPost, quotePost, editPost, isLoggedIn} = this.props;
    const {location: {query}} = this.props;
    const focusPostId = query && query.focus_post;

    return (
      <ForumWrapper>
        <Helmet title={topic.title} />
        <div className={styles.ForumTopic}>
          <div className="container">
            <Breadcrumb breadcrumbs={topic.breadcrumbs} />
            <h1>{topic.title}</h1>
            {topic.posts.map((post) =>
              <Post
                focus={focusPostId === post.pid}
                key={post.pid}
                topic={topic}
                replyPost={replyPost}
                quotePost={quotePost}
                editPost={editPost}
                isLoggedIn={isLoggedIn}
                post={post}>
                {post.index === 0 && topic.posts.length > 1 && this.renderToolbar()}
              </Post>)}

            {this.renderToolbar()}
            <Paginate baseUrl={`/topic/${topic.slug}`} pagination={topic.pagination} />
          </div>
        </div>
      </ForumWrapper>
    );
  }
}
