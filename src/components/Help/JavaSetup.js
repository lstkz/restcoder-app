import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';
import CheckoutCodeSection from './CheckoutCodeSection';
import SubmitCodeSection from './SubmitCodeSection';
import VersionWarning from './VersionWarning';
import RunForeman from './RunForeman';

export default class NodejsSetup extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting Started with Java</h1>
        <h3>Setup</h3>
        <section>
          Install <Link to="/help/cli-tool">RestCoder CLI tool</Link>
        </section>
        <section>
          Install <a target="_blank" href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">Java 8 <i className="fa fa-external-link"/></a>
          <br/>
          Install <a target="_blank" href="http://maven.apache.org/download.html">Maven 3 <i className="fa fa-external-link"/></a>
          <br/>
          Check if java is properly installed:
          <br/>
          <pre><code>
            <span className="nv">$ </span>java -version<br/>
            java version "1.8.0_65"

          </code></pre>
          <pre><code>
            <span className="nv">$ </span>mvn --version<br/>
            Apache Maven 3.3.3
          </code></pre>
        </section>

        <CheckoutCodeSection lang="java"/>

        <h3>Define Java version</h3>
        <section>
          You can define a target version in system.properties. <br/>
          This file must contain exactly one file
          <br/>
          Example: Use Java 8
          <pre><code>java.runtime.version=1.8</code></pre>
          <VersionWarning/>
        </section>

        <h3>Solve it</h3>
        <section>
          Add following code to <code>src/main/java/Main.java</code>
          <pre><code>get("/hello", (req, res) -> "world")</code></pre>
          You can find a complete solution <a target="_blank" href="https://github.com/restcoder/Starter-Hello-world">here <i
            className="fa fa-external-link"/></a>
        </section>

        <h3>Running code locally</h3>
        <section>
          Install dependencies from pom.xml
        <pre><code><span className="nv">$ </span>mvn install<br/></code></pre>
          <RunForeman>
            <span className="nv">$ </span>nf start<br/>
            <span className={styles.yellow}>[WARN] No ENV file found</span><br/>
            <span className={styles.success}>[OKAY] Trimming display Output to 243 Columns</span><br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> [Thread-0] INFO spark.webserver.SparkServer - == Spark has ignited ...<br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> [Thread-0] INFO spark.webserver.SparkServer - >> Listening on 0.0.0.0:5000<br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> [Thread-0] INFO org.eclipse.jetty.server.Server - jetty-9.0.2.v20130417<br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> {'[Thread-0] INFO org.eclipse.jetty.server.ServerConnector - Started ServerConnector@397f5f60{HTTP/1.1}{0.0.0.0:5000}'}<br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> READY
          </RunForeman>
          <strong>Important: </strong>Use <code>nf start -j Procfile.windows</code> command in Windows
        </section>
        <SubmitCodeSection lang="java@1.8.0" fileCount={6} />
      </div>
    );
  }
}
