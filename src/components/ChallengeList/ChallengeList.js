import React, {Component, PropTypes} from 'react';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import {Link} from 'react-router';

export default class ChallengeList extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    isLoggedIn: PropTypes.bool.isRequired
  };

  render() {
    const styles = require('./ChallengeList.scss');
    const {items, isLoggedIn} = this.props;

    const tooltip = (
      <Tooltip id="Unattempted">Unattempted</Tooltip>
    );

    return (
      <div className={styles.ChallengeList}>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
            <tr>
              {isLoggedIn && <th/>}
              <th>ID</th>
              <th>Name</th>
              <th>Attempts</th>
              <th>Users</th>
              <th>Accuracy</th>
              <th>Level</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, i) =>
              <tr key={i} className={i % 2 ? 'odd' : 'even'}>
                {isLoggedIn && <td>
                  <OverlayTrigger placement="left" overlay={tooltip}>
                    <i className="fa fa-circle c-gray"/>
                  </OverlayTrigger>
                </td>}
                <td>{item.id}</td>
                <td>
                  <Link to={'/challenge/' + item.id}>{item.name}</Link>
                  <br/>
                  <small>{item.tags.join(', ')}</small>
                </td>
                <td className="center">{item.stats.uniqueAttempts}</td>
                <td className="center">{item.stats.totalUniqueSolved}</td>
                <td className="center">{Math.floor(item.stats.uniqueAttempts / item.stats.totalUniqueSolved * 100)}%
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
