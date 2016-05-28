import React, { PropTypes } from 'react';
import styles from './Permalink.scss';
import {Link} from 'react-router';
import moment from 'moment';

export default class Permalink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
  };

  render() {
    const {to, time} = this.props;
    const date = new Date(time);
    const ago = moment(date).fromNow();
    return (
      <Link to={to} className={styles.Permalink}>
        <small title={date.toString()}>{ago}</small>
      </Link>
    );
  }
}
