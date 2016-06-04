import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './ForumCategory.scss';
import {asyncConnect} from 'redux-async-connect';
import ForumWrapper from '../ForumWrapper/ForumWrapper';
import {TopicItem, Breadcrumb, Paginate, WatchBtn} from '../../components/Forum';
import * as actions from '../../redux/modules/forum';
import Helmet from 'react-helmet';

@asyncConnect([{
  promise: ({ params, location, store: { dispatch } }) => dispatch(actions.initCategory(params.id, location.query.page))
}])
@connect(state => ({...state.forum, isLoggedIn: state.auth.isLoggedIn}), actions)
export default class Forum extends React.Component {
  static
  propTypes = {
    category: PropTypes.object.isRequired,
    showComposer: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  };

  onNewTopic() {
    const {showComposer, category} = this.props;
    showComposer({
      mode: 'new',
      title: '',
      category: category.cid,
      isTitleReadOnly: false,
    });
  }

  render() {
    const { category, watchCategory, unwatchCategory, isLoggedIn} = this.props;
    const canCreateTopic = category.privileges['topics:create'];
    const {topics} = category;
    return (
      <ForumWrapper>
        <Helmet title={category.name} />
        <div classNameName={styles.ForumCategory}>
          <div className="container">
            <Breadcrumb breadcrumbs={category.breadcrumbs} />

            {isLoggedIn && <div className="clearfix">
              {canCreateTopic && <button className="btn btn-primary btn-inverse" onClick={::this.onNewTopic}>New Topic</button>}
              <span className="pull-right">
                   <WatchBtn isIgnored={category.isIgnored} watch={watchCategory} unwatch={unwatchCategory} />
               </span>
            </div>}
            <hr className="hidden-xs"/>
            <p className="hidden-xs" dangerouslySetInnerHTML={{__html: category.name}}>
            </p>
            {topics.map((topic) => <TopicItem key={topic.tid} topic={topic} />)}
            {topics.length === 0 && <div className="dialog dialog-warning">
              <strong>There are no topics in this category.</strong>
            </div>}
            <Paginate baseUrl={`/category/${category.slug}`} pagination={category.pagination} />
          </div>
        </div>
      </ForumWrapper>
    );
  }
}
