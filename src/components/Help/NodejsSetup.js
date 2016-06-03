import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';
import CheckoutCodeSection from './CheckoutCodeSection';
import SubmitCodeSection from './SubmitCodeSection';
import VersionWarning from './VersionWarning';
import RunForeman from './RunForeman';

export default class NodejsSetup extends React.Component {
  static propTypes = {};

  renderVersion(version) {
    return <pre><code>{`"engines": { "node": "${version}" }`}</code></pre>;
  }

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting started with Node.js</h1>
        <h3>Setup</h3>
        <section>
          Install <Link to="/help/cli-tool">RestCoder CLI tool</Link>
        </section>
        <section>
          Install <a target="_blank" href="https://nodejs.org">Node.js <i className="fa fa-external-link"/></a>
          <br/>
          You can install any nodejs version.<br/>
          Check if nodejs is properly installed:
          <br/>
        <pre><code>
          <span className="nv">$ </span>node -v<br/>
          v6.1.0
        </code></pre>
        <pre><code>
          <span className="nv">$ </span>npm -v<br/>
          3.8.6
        </code></pre>
        </section>

        <CheckoutCodeSection lang="nodejs"/>

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

        <h3>Solve it</h3>
        <section>
          Add following code to app.js
          <pre><code>app.get("/hello", (req, res) => res.end("world"));</code></pre>
          You can find a complete solution <a target="_blank" href="https://github.com/restcoder/Starter-Hello-world">here <i
            className="fa fa-external-link"/></a>
        </section>

        <h3>Running code locally</h3>
        <section>
          Install dependencies from package.json
        <pre><code><span className="nv">$ </span>npm install<br/></code></pre>
          <RunForeman>
            <span className="nv">$ </span>nf start<br/>
            <span className={styles.yellow}>[WARN] No ENV file found</span><br/>
            <span className={styles.success}>[OKAY] Trimming display Output to 243 Columns</span><br/>
            <span className={styles.cyan}>11:25:48 AM web.1 |</span>  Listening on 5000<br/>
            <span className={styles.cyan}>11:25:48 AM web.1 |</span>  READY
          </RunForeman>
        </section>
        <SubmitCodeSection lang="nodejs@4.4.4'"/>
      </div>
    );
  }
}
