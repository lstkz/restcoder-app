import React, { PropTypes } from 'react';
import {Link} from 'react-router';
import styles from './ForgotLinks.scss';

export default class ForgotLinks extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div className={styles.ForgotLinks}>
        <hr/>
        <div className="text-center">
          <Link to={'/forgot-password'}><small>Forgot password?</small></Link>
          &nbsp; | &nbsp;
          <Link to={'/activation-link'}><small>Resend activation link?</small></Link>
        </div>
      </div>
    );
  }
}
