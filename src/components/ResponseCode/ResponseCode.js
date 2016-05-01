import React, { PropTypes } from 'react';
import styles from './ResponseCode.scss';
import classNames from 'classnames';

export default class ResponseCode extends React.Component {
  static propTypes = {
    code: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };

  render() {
    const {code} = this.props;
    const colors = {
      2: 'bgm-green',
      3: 'bgm-blue',
      4: 'bgm-orange',
      5: 'bgm-red'
    };
    const cssClass = colors[Math.floor(+code / 100)];
    return (
      <span className={classNames(styles.ResponseCode, 'badge', cssClass)}>{code}</span>
    );
  }
}
