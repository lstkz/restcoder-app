import React, {PropTypes} from 'react';
import styles from './Ranking.scss';

export default class Ranking extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const {items} = this.props;
    return (
      <div className={styles.Ranking}>

        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Score</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, i) =>
              <tr key={i} className={i % 2 ? 'odd' : 'even'}>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
