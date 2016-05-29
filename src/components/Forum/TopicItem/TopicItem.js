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
  };

  render() {
    const { topic } = this.props;
    let teaser = null;
    if (topic.teaser) {
      teaser = {...topic.teaser, url: `/topic/${topic.slug}/${topic.teaser.pid}`};
    }

    return (
      <div className={`${styles.TopicItem} clearfix`}>
        <div className="col-md-7 col-sm-9 col-xs-10">
          <div className="pull-left">
            <UserIcon large user={topic.user}/>
          </div>

          <h2>
            <Link to={`/topic/${topic.slug}`}>{topic.title}</Link>
            <br/>
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
          <Teaser emptyText="No one has replied" teaser={teaser} />
        </div>
      </div>
    );
  }
}
