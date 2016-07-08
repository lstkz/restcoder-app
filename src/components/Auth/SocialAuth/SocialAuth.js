import React, { PropTypes } from 'react';
import styles from './SocialAuth.scss';

export default class SocialAuth extends React.Component {
  static propTypes = {
    socialAuth: PropTypes.func.isRequired,
  };

  render() {
    const {socialAuth} = this.props;
    const auth = (type) => () => socialAuth(type);
    return (
      <div className={styles.SocialAuth}>
        <div className={styles.or}>
          <hr/>
          <span>or</span>
          <hr/>
        </div>

        <div className={styles.social}>
          <a onClick={auth('facebook')} className={styles.socialBtnFB}><i className="fa fa-facebook"/><span>Facebook</span></a>
          <a onClick={auth('google')} className={styles.socialBtnG}><i className="fa fa-google-plus"/><span>Google</span></a>
          <a onClick={auth('github')} className={styles.socialBtnGH}><i className="fa fa-github"/><span>Github</span></a>
        </div>
      </div>
    );
  }
}
