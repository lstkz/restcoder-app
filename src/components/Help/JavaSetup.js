import React, {PropTypes} from 'react';
import styles from './Help.scss';
import VersionWarning from './VersionWarning';
import {ExternalLink, BashCode} from '../';

export default class NodejsSetup extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting Started with Java</h1>
        <h3>Setup</h3>
        <section>
          Install <ExternalLink href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">Java 8</ExternalLink>
          <br/>
          Install <ExternalLink href="http://maven.apache.org/download.html">Maven 3</ExternalLink>
          <br/>
          Check if java is properly installed:
          <br/>
          <BashCode>java -version<br/>
            java version "1.8.0_65"
          </BashCode>
          <BashCode>mvn --version<br/>
            Apache Maven 3.3.3
          </BashCode>
        </section>

        <div className="alert alert-danger">
          <strong>c9.io Setup</strong><br/>
          We currently don't support Java in c9.io. Sorry!
        </div>

        <h3>Define Java version</h3>
        <section>
          You can define a target version in system.properties. <br/>
          This file must contain exactly one file
          <br/>
          Example: Use Java 8
          <pre><code>java.runtime.version=1.8</code></pre>
          <VersionWarning/>
        </section>
      </div>
    );
  }
}
