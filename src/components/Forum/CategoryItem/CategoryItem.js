import React, {PropTypes} from 'react';
import styles from './CategoryItem.scss';
import {Link} from 'react-router';
import StatsNumber from '../StatsNumber/StatsNumber';
import Teaser from '../Teaser/Teaser';

export default class CategoryItem extends React.Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
  };

  render() {
    const { category } = this.props;

    return (
      <div className={`${styles.CategoryItem} clearfix`}>

        <div className="col-md-7 col-sm-9 col-xs-12">
          <div className={`${styles.icon} pull-left`} style={{
            backgroundColor: category.bgColor,
            color: category.color
          }}>
            <i className={`fa fa-fw ${category.icon}`}/>
          </div>

          <h2 className={styles.title}>
            <Link to={`/forum/category/${category.slug}`} dangerouslySetInnerHTML={{__html: category.name}}>
            </Link><br/>
            <div className={styles.description}>
              {category.description}
            </div>

          </h2>
          <span className="visible-xs pull-right">
            <a className="permalink" href="/topic/3/asdsadsadasd/2">
              <small className="timeago" title="Sat May 28 2016 12:29:12 GMT+0200 (CEST)">2 minutes ago</small>
            </a>
          </span>
        </div>

        <div className="col-md-1 hidden-sm hidden-xs">
          <StatsNumber title="Topics" count={category.topic_count} />
        </div>
        <div className="col-md-1 hidden-sm hidden-xs stats">
          <StatsNumber title="Posts" count={category.post_count} />
        </div>
        <div className="col-md-3 col-sm-3 hidden-xs" component="topic/teaser">
          <Teaser color={category.bgColor} teaser={category.teaser} post={category.posts[0]} />
        </div>
      </div>
    );
  }
}
