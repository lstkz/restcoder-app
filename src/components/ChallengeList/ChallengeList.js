import React, {Component, PropTypes} from 'react';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {Link} from 'react-router';
import classNames from 'classnames';

export default class ChallengeList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    error: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./ChallengeList.scss');
    const {items, isLoggedIn} = this.props;

    return (
      <div className={styles.ChallengeList}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
            <tr>
              {isLoggedIn && <th/>}
              <th>ID</th>
              <th>Name</th>
              <th className="hidden-sm hidden-xs">Attempts</th>
              <th className="hidden-xs">Users</th>
              <th className="hidden-sm hidden-xs">Accuracy</th>
              <th>Level</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, i) =>
              <tr key={i} className={i % 2 ? 'odd' : 'even'}>
                {isLoggedIn && <td>
                  <OverlayTrigger placement="left" overlay={<Tooltip id="item">{item.solved ? 'Solved' : 'Unattempted'}</Tooltip>}>
                    <i className={classNames('fa fa-circle', {'c-gray': !item.solved, 'c-green': item.solved })}/>
                  </OverlayTrigger>
                </td>}
                <td>{item.id}</td>
                <td>
                  <Link to={'/challenge/' + item.id}>{item.name}</Link>
                  <br/>
                  <small>{item.tags.join(', ')}</small>
                </td>
                <td className="center hidden-sm hidden-xs">{item.stats.attempts}</td>
                <td className="center hidden-xs">{item.stats.totalUniqueSolved}</td>
                <td className="center hidden-sm hidden-xs">{item.stats.attempts && Math.floor(item.stats.totalSolved / item.stats.attempts * 100)}%
                </td>
                <td className="center">{item.level}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
