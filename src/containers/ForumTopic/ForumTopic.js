import React, {PropTypes} from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import ForumWrapper from '../ForumWrapper/ForumWrapper';
import styles from './ForumTopic.scss';
import * as actions from '../../redux/modules/forum';
import {Post, Breadcrumb, Paginate} from '../../components/Forum';

@asyncConnect([{
  promise: ({ location, params, store: { dispatch } }) => dispatch(actions.initTopic(params.id, location.query.page))
}])
@connect(state => ({...state.forum}), actions)
export default class ForumTopic extends React.Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
    query: PropTypes.object,
    location: PropTypes.object.isRequired,
    replyPost: PropTypes.func.isRequired,
    quotePost: PropTypes.func.isRequired,
    editPost: PropTypes.func.isRequired,
  };


  render() {
    const {topic, replyPost, quotePost, editPost} = this.props;
    const {location: {query}} = this.props;
    const focusPostId = query && query.focus_post && Number(query.focus_post);

    return (
      <ForumWrapper>
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
                post={post} /> )}

            <Paginate baseUrl={`/topic/${topic.slug}`} pagination={topic.pagination} />
          </div>
        </div>
      </ForumWrapper>
    );
  }
}
