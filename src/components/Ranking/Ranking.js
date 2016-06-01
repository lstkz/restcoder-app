import React, {PropTypes} from 'react';
import styles from './Ranking.scss';
import {Link} from'react-router';
import {UserPhoto} from '../';

export default class Ranking extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  getBestLanguage(stats) {
    let ret = '';
    let score = -1;
    for (const prop in stats) {
      if (stats.hasOwnProperty(prop)) {
        if (stats[prop] > score) {
          score = stats[prop];
          ret = prop;
        }
      }
    }
    return ret;
  }

  render() {
    const {items} = this.props;
    return (
      <div className={styles.Ranking}>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
            <tr>
              <th>#</th>
              <th>Score</th>
              <th>User</th>
              <th>Best language</th>
              <th>Solved problems</th>
              <th>Total submissions</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, i) =>
              <tr key={i} className={i % 2 ? 'odd' : 'even'}>
                <td>{item.rank}</td>
                <td>{item.score}</td>
                <td>
                  <Link to={`/profile/${item.username}`}>
                    <UserPhoto user={item} size={24} />
                    &nbsp;
                    {item.username}
                  </Link>
                </td>
                <td>{this.getBestLanguage(item.stats.languages)}</td>
                <td>{item.stats.solvedProblems}</td>
                <td>{item.stats.submissions}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
