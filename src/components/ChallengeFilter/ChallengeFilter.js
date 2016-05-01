import React, { PropTypes } from 'react';
import styles from './ChallengeFilter.scss';

export default class ChallengeFilter extends React.Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  };

  render() {
    const {filters, onChange} = this.props;

    return (
      <div className={styles.ChallengeFilter}>
        <ul className="nav nav-list nav-list-vivid">
          {filters.map((filter) =>
            [
              <li className="nav-header">{filter.name}</li>,
              filter.items.map((item) => <li><a href="#">{item.name} <span className="badge pull-right">{item.count}</span></a></li>),
              <li className="divider"/>
            ]
          )}
        </ul>
      </div>
    );
  }
}
