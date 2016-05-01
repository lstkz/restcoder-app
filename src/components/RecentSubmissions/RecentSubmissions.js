import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import moment from 'moment';

export default class RecentSubmissions extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
  };

  render() {
    const styles = require('./RecentSubmissions.scss');
    const {items} = this.props;

    return (
      <div className={styles.recentSubmissions}>
        <div className="panel panel-default panel-info">
          <div className="panel-heading"> Recent submissions</div>
          <div className="">
            <ul className="list-group">
              {items.map((item, i) =>
                <li key={i} className="list-group-item">
                  <span className={classnames('badge', {'bgm-red': item.result === 'FAIL', 'bgm-green': item.result === 'PASS'})}>{item.result}</span>
                  <a><strong>{item.problem.name}</strong></a>
                  <br/>
                  <small>By <a>{item.user.username}</a> <i>{moment(item.createdAt).fromNow()}</i>
                  </small>
                </li>
              )}
            </ul>
          </div>
          <a className="view-all" href="">View All</a>
        </div>
      </div>
    );
  }
}