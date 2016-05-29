import React, {PropTypes} from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import ForumWrapper from '../ForumWrapper/ForumWrapper';
import styles from './ForumTopic.scss';
import * as actions from '../../redux/modules/forum';
import {Post, Breadcrumb} from '../../components/Forum';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => dispatch(actions.initTopic(params.id))
}])
@connect(state => state.forum, actions)
export default class ForumTopic extends React.Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
    replyPost: PropTypes.func.isRequired,
    quotePost: PropTypes.func.isRequired,
  };

  render() {
    const {topic, replyPost, quotePost} = this.props;

    return (
      <ForumWrapper>
        <div className={styles.ForumTopic}>
          <div className="container">
            <Breadcrumb breadcrumbs={topic.breadcrumbs} />
            <h1>{topic.title}</h1>
            {topic.posts.map((post) => <Post key={post.pid} topic={topic} replyPost={replyPost} quotePost={quotePost} post={post} /> )}
          </div>
        </div>
      </ForumWrapper>
    );
  }
}
