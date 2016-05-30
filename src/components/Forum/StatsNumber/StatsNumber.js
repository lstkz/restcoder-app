import React, { PropTypes } from 'react';
import styles from './StatsNumber.scss';

export default class StatsNumber extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
  };

  render() {
    const {title, count, className} = this.props;

    return (
      <div className={`${styles.StatsNumber} ${className || ''}`}>
        <span title={count}>{count}</span><br/>
        <small>{title}</small>
      </div>
    );
  }
}
