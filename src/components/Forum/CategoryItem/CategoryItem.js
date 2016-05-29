import React, {PropTypes} from 'react';
import styles from './CategoryItem.scss';
import {Link} from 'react-router';
import StatsNumber from '../StatsNumber/StatsNumber';
import Teaser from '../Teaser/Teaser';
import Permalink from '../Permalink/Permalink';

export default class CategoryItem extends React.Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
  };

  render() {
    const { category } = this.props;
    let teaser = null;
    if (category.teaser) {
      teaser = {...category.teaser, ...category.posts[0]};
      teaser.url = '/post/' + teaser.pid;
    }
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
            <Link to={`/category/${category.slug}`} dangerouslySetInnerHTML={{__html: category.name}}/>
            <br/>
            <div className={styles.description}>
              {category.description}
            </div>

          </h2>
          <span className="visible-xs pull-right">
            {category.teaser && <Permalink time={category.teaser.timestampISO} to={category.teaser.url} />}
          </span>
        </div>

        <div className="col-md-1 hidden-sm hidden-xs">
          <StatsNumber title="Topics" count={category.topic_count} />
        </div>
        <div className="col-md-1 hidden-sm hidden-xs stats">
          <StatsNumber title="Posts" count={category.post_count} />
        </div>
        <div className="col-md-3 col-sm-3 hidden-xs">
          <Teaser color={category.bgColor} teaser={teaser} emptyText="No new posts." />
        </div>
      </div>
    );
  }
}
