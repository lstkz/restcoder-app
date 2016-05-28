import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './ForumCategory.scss';
import {asyncConnect} from 'redux-async-connect';
import {App} from '../';
import {SortByBtn, WatchBtn, TopicItem} from '../../components/Forum';
import {initCategory} from '../../redux/modules/forum';
import {ButtonToolbar} from 'react-bootstrap';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => dispatch(initCategory(params.id))
}])
@connect(state => state.forum, {})
export default class Forum extends React.Component {
  static
  propTypes = {
    category: PropTypes.object.isRequired,
  };

  render() {
    const { category } = this.props;
    return (
      <App>
        <div classNameName={styles.ForumCategory}>
          <div className="container">
            <div className="clearfix">
              <button className="btn btn-primary btn-inverse">New Topic</button>
               <span className="pull-right">
                 <ButtonToolbar>
                   <WatchBtn />
                   <SortByBtn />
                 </ButtonToolbar>
               </span>
            </div>
            <hr className="hidden-xs"/>
            <p className="hidden-xs">
              {category.name}
            </p>
            {category.topics.map((topic) => <TopicItem key={topic.tid} topic={topic} />)}
          </div>
        </div>
      </App>
    );
  }
}
