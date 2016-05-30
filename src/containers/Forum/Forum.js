import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import styles from './Forum.scss';
import {asyncConnect} from 'redux-async-connect';
import ForumWrapper from '../ForumWrapper/ForumWrapper';
import {CategoryItem} from '../../components/Forum';
import {initCategories} from '../../redux/modules/forum';


@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(initCategories())
}])
@connect(state => ({...state.forum, forumUnreadTotal: state.global.forumUnreadTotal}), {})
export default class Forum extends React.Component {
  static
  propTypes = {
    categories: PropTypes.array.isRequired,
    forumUnreadTotal: PropTypes.number,
  };

  render() {
    const { categories, forumUnreadTotal } = this.props;
    return (
      <ForumWrapper>
        <div classNameName={styles.Forum}>
          <div className="container">
            {forumUnreadTotal > 0 && <div className="clearfix">
              <Link to="/unread">
                <button className="btn btn-inverse pull-right">
                  <i className="fa fa-fw fa-inbox"/>
                  {forumUnreadTotal} unread topic(s)
                </button>
              </Link>
            </div>}
            <h1 className={styles.title}>Categories</h1>
            {categories.map(category => <CategoryItem key={category.cid} category={category}/>)}
          </div>
        </div>
      </ForumWrapper>
    );
  }
}
