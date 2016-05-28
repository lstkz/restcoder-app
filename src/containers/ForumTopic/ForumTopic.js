import React, {PropTypes} from 'react';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import ForumWrapper from '../ForumWrapper/ForumWrapper';
import styles from './ForumTopic.scss';
import {initTopic} from '../../redux/modules/forum';
import {Post, Breadcrumb} from '../../components/Forum';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => dispatch(initTopic(params.id))
}])
@connect(state => state.forum, {})
export default class ForumTopic extends React.Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
  };

  render() {
    const {topic} = this.props;

    return (
      <ForumWrapper>
        <div className={styles.ForumTopic}>
          <div className="container">
            <Breadcrumb breadcrumbs={topic.breadcrumbs} />
            <h1>{topic.title}</h1>
            {topic.posts.map((post) => <Post key={post.pid} post={post} /> )}
          </div>
        </div>
      </ForumWrapper>
    );
  }
}
