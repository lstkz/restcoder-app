import React, {PropTypes} from 'react';
import moment from 'moment';
import styles from './TimeAgo.scss';

export default class TimeAgo extends React.Component {
  static propTypes = {
    isoDate: PropTypes.string.isRequired,
  };

  render() {
    const {isoDate} = this.props;
    const date = new Date(isoDate);
    const ago = moment(date).fromNow();
    return (
      <span className={styles.TimeAgo} title={date.toString()}>{ago}</span>
    );
  }
}
