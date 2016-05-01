import React, { PropTypes } from 'react';
import styles from './ChallengeFilter.scss';

export default class ChallengeFilter extends React.Component {
  static propTypes = {
    filters: PropTypes.array.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    filter: PropTypes.object.isRequired
  };

  toggle(e, filterName, name) {
    e.preventDefault();
    this.props.toggleFilter({filterName, name});
  }

  render() {
    const {filters, filter: currentFilter} = this.props;
    const getClass = (filterName, name) => {
      const filter = currentFilter[filterName];
      if (!filter || filter.indexOf(name) === -1) {
        return null;
      }
      return 'active';
    };

    return (
      <div className={styles.ChallengeFilter}>
        <ul className="nav nav-list nav-list-vivid">
          {filters.map((filter) =>
            [
              <li className="nav-header">{filter.name}</li>,
              filter.items.map((item) =>
                <li className={getClass(filter.name, item.name)}>
                  <a href="#" onClick={(e) => this.toggle(e, filter.name, item.name)}>
                  {item.name} <span className="badge pull-right">{item.count}</span>
                  </a>
                </li>),
              <li className="divider"/>
            ]
          )}
        </ul>
      </div>
    );
  }
}
