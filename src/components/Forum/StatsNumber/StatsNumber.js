import React, { PropTypes } from 'react';
import styles from './StatsNumber.scss';

export default class StatsNumber extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
  };

  render() {
    const {title, count} = this.props;

    return (
      <div className={styles.StatsNumber}>
        <span title={count}>{count}</span><br/>
        <small>{title}</small>
      </div>
    );
  }
}
