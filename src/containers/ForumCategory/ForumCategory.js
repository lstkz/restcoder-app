import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './ForumCategory.scss';
import {asyncConnect} from 'redux-async-connect';
import ForumWrapper from '../ForumWrapper/ForumWrapper';
import {TopicItem, Breadcrumb} from '../../components/Forum';
import * as actions from '../../redux/modules/forum';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => dispatch(actions.initCategory(params.id))
}])
@connect(state => state.forum, actions)
export default class Forum extends React.Component {
  static
  propTypes = {
    category: PropTypes.object.isRequired,
    showComposer: PropTypes.func.isRequired,
  };

  onNewTopic() {
    const {showComposer, category} = this.props;
    showComposer({
      mode: 'new',
      category: category.cid,
      isTitleReadOnly: false,
    });
  }

  render() {
    const { category } = this.props;
    return (
      <ForumWrapper>
        <div classNameName={styles.ForumCategory}>
          <div className="container">
            <Breadcrumb breadcrumbs={category.breadcrumbs} />

            <div className="clearfix">
              <button className="btn btn-primary btn-inverse" onClick={::this.onNewTopic}>New Topic</button>
              {/*<span className="pull-right">
                 <ButtonToolbar>
                   <WatchBtn />
                   <SortByBtn />
                 </ButtonToolbar>
               </span>*/}
            </div>
            <hr className="hidden-xs"/>
            <p className="hidden-xs">
              {category.name}
            </p>
            {category.topics.map((topic) => <TopicItem key={topic.tid} topic={topic} />)}
          </div>
        </div>
      </ForumWrapper>
    );
  }
}
