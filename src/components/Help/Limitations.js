import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';

export default class Limitations extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Limitations</h1>
        <section>
          The only restriction is the Internet connection. Your application won't have access outside of firewall.<br/>
          Your are only allowed to connect to provided services.<br/><br/>
          Please also check <Link to="/help/platform-information">Platform Information</Link> for memory limit information.
        </section>
      </div>
    );
  }
}
