import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './Forum.scss';
import {asyncConnect} from 'redux-async-connect';
import {App} from '../';
import {CategoryItem} from '../../components/Forum';
import {initCategories} from '../../redux/modules/forum';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(initCategories())
}])
@connect(state => state.forum, {})
export default class Forum extends React.Component {
  static
  propTypes = {
    categories: PropTypes.array.isRequired,
  };

  render() {
    const {categories} = this.props;
    return (
      <App>
      <div classNameName={styles.Forum}>
        <div className="container" id="content">
          <h1 className={styles.title}>Categories</h1>
          {categories.map(category => <CategoryItem key={category.cid} category={category} />)}
        </div>
      </div>
      </App>
    );
  }
}
