import React, { PropTypes } from 'react';
import styles from './PageTitle.scss';

export default class PageTitle extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    return (
      <h1 className={styles.PageTitle}>
        {this.props.children}
      </h1>
    );
  }
}
