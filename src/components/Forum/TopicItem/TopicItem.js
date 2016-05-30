import React, {PropTypes} from 'react';
import styles from './TopicItem.scss';
import UserIcon from '../UserIcon/UserIcon';
import {Link} from 'react-router';
import StatsNumber from '../StatsNumber/StatsNumber';
import TimeAgo from '../TimeAgo/TimeAgo';
import Teaser from '../Teaser/Teaser';

export default class TopicItem extends React.Component {
  static propTypes = {
    topic: PropTypes.object.isRequired,
    showCategory: PropTypes.bool,
  };

  renderCategory() {
    const {showCategory, topic: {category}} = this.props;
    if (!showCategory) {
      return null;
    }
    return (
      <small>
        <Link to={`/category/${category.slug}`}>
          <span className="fa-stack fa-lg">
            <i style={{color: category.bgColor}} className="fa fa-circle fa-stack-2x"/>
            <i style={{color: category.color}} className={`fa ${category.icon} fa-stack-1x`}/>
          </span>
          {category.name}
        </Link>
        &nbsp; • &nbsp;
      </small>
    );
  }

  render() {
    const { topic } = this.props;
    let teaser = null;
    if (topic.teaser) {
      teaser = {...topic.teaser, url: `/post/${topic.teaser.pid}`};
    }

    return (
      <div className={`${styles.TopicItem} clearfix ${topic.unread ? styles.unread : styles.read}`}>
        <div className="col-md-7 col-sm-9 col-xs-10">
          <div className="pull-left">
            <UserIcon large user={topic.user}/>
          </div>

          <h2>
            <Link to={`/topic/${topic.slug}`}>{topic.title}</Link>
            <br/>
            {this.renderCategory()}
            <small className="hidden-xs">
              <TimeAgo isoDate={topic.timestampISO}/>
            </small>
            <small className="visible-xs-inline">
              <TimeAgo isoDate={topic.timestampISO}/>
            </small>
          </h2>
        </div>

        <div className="col-xs-2 visible-xs text-right">
          <span>{topic.postcount}</span>
          <Link to={`/topic/${topic.slug}`}><i className="fa fa-arrow-circle-right"/></Link>
        </div>

        <div className="col-md-1 hidden-sm hidden-xs">
          <StatsNumber title="Posts" count={topic.postcount} />
        </div>

        <div className="col-md-1 hidden-sm hidden-xs">
          <StatsNumber title="Views" count={topic.viewcount} />
        </div>

        <div className="col-md-3 col-sm-3 hidden-xs">
          <Teaser color={topic.unread ? '#fda34b' : null} emptyText="No one has replied" teaser={teaser} />
        </div>
      </div>
    );
  }
}
