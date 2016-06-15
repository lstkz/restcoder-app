import React, {PropTypes} from 'react';
import styles from './Help.scss';
import VersionWarning from './VersionWarning';
import {ExternalLink, BashCode} from '../';

export default class NodejsSetup extends React.Component {
  static propTypes = {};

  renderVersion(version) {
    return <pre><code>{`"engines": { "node": "${version}" }`}</code></pre>;
  }

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting Started with Node.js</h1>
        <h3>Setup</h3>
        <section>
          Install <ExternalLink to="https://nodejs.org">Node.js</ExternalLink>
          <br/>
          Node.js is required by the CLI tool and you should have it already installed.
          <br/>
          Check versions:
          <br/>
          <BashCode>
            node -v<br/>
            v6.1.0
          </BashCode>
          <BashCode>
            npm -v<br/>
            3.8.6
          </BashCode>
        </section>

        <h3>Define Node.js version</h3>
        <section>
          You can define a target version in package.json.
          <br/>
          Example: Use latest v4
          {this.renderVersion('4.x')}
          Example: Use latest v6
          {this.renderVersion('6.x')}
          <VersionWarning/>
        </section>
      </div>
    );
  }
}
