import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {App} from '../';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {Link} from 'react-router';
import {NodejsSetup, ProcfileInfo} from '../../components/Help';

@asyncConnect([{
  promise: () => Promise.resolve()
}])
@connect(state => state, {})
export default class Help extends React.Component {
  static propTypes = {};

  renderForemanImportant() {
    return (
      <div>
        <h4>Important</h4>
        Node foreman can read automatically environmental variables from the <code>.env</code>file.
        <br/>
        <strong>Example:</strong><br/>
        In <Link to="/challenge/2">Starter: Database connection</Link> problem, you must set a
        <code>POSTGRES_URL</code> variable.
        <br/>
        You can create a <code>.env</code> file with the following content:
          <pre><code>
            POSTGRES_URL="postgres://localhost:5432/mydb"
          </code></pre>
        The <code>PORT</code> variable is always set by foreman automatically with a default value <code>5000</code>.
        <br/>
        You can override it by adding a <code>-p</code> parameter. For example: <code>nf start -p 5555</code>
      </div>
    );
  }
  renderCheckoutCode(lang) {
    return (
      <div>
        <h3>Checkout code</h3>
        <section>
          In this example we will be solving <Link to="/challenge/1">Starter: Hello world</Link>. <br/>
          Create an empty directory.<br/>
          <pre><code>
            <span className="nv">$ </span>mkdir {lang}-hello-world<br/>
            <span className="nv">$ </span>cd {lang}-hello-world<br/>
          </code></pre>
          Prepare a code template.
          <pre><code>
            <span className="nv">$ </span>restcoder init 1<br/>
          </code></pre>
          <small>NOTE: Parameter <code>1</code> is the problem id. You can get this parameter from the <strong>Checkout code</strong>
            section in the problem statement.
          </small>
        </section>
      </div>
    );
  }

  renderSubmitCodeSection(language) {
    return (
      <div>
        <h3>Submitting code to RestCoder</h3>
        <section>
          Simply run:
          <pre><code>
            <span className="nv">$ </span>restcoder submit<br/>
          </code></pre>
          And wait for the results...

          <pre><code>
            Packing source code...<br/>
Found 3 file(s)<br/>
Packing source code... <span className={styles.success}>Success</span><br/>
Submitting source code...<br/>
Submitting source code... <span className={styles.success}>Success</span><br/>
<span className={styles.yellow}><strong>Problem</strong>: Starter: Hello world</span><br/>
<span className={styles.yellow}><strong>Language</strong>: {language}</span><br/>
Waiting for tester...<br/>
<span className={styles.cyan}>tester:</span> Preparing...<br/>
<span className={styles.cyan}>tester:</span> Installing dependencies...<br/>
<span className={styles.cyan}>tester:</span> Installing dependencies... <span className={styles.success}>Success</span><br/>
<span className={styles.cyan}>tester:</span> Starting apps. Waiting for 'READY'...<br/>
<span className={styles.cyan}>tester:</span> Starting apps. Waiting for 'READY'... <span className={styles.success}>Success</span><br/>
<span className={styles.cyan}>tester:</span> Initializing unit tests...<br/>
<span className={styles.cyan}>tester:</span> Running <span className={styles.cyan}>1</span> test(s)<br/>
<span className={styles.cyan}>tester:</span> TEST 1: running...<br/>
<span className={styles.cyan}>tester:</span> TEST 1: <span className={styles.success}>PASS</span><br/>
<span className={styles.cyan}>tester:</span> Result: <span className={styles.success}>PASS</span>

          </code></pre>
        </section>
      </div>
    );
  }
//
//  renderNodejs() {
//    return (
//      <div className={styles.steps}>
//        <h1 className="text-center">Getting started with Node.js</h1>
//        <h3>Setup</h3>
//        <section>
//          Install <Link to="/help/cli-tool">RestCoder CLI tool</Link>
//        </section>
//        <section>
//          Install <a target="_blank" href="https://nodejs.org">Node.js <i className="fa fa-external-link"/></a>
//          <br/>
//          You can install any nodejs version.<br/>
//          Check if nodejs is properly installed:
//          <br/>
//          <pre><code>
//            <span className="nv">$ </span>node -v<br/>
//            v6.1.0
//          </code></pre>
//          <pre><code>
//            <span className="nv">$ </span>npm -v<br/>
//            3.8.6
//          </code></pre>
//        </section>
//
//        {this.renderCheckoutCode('nodejs')}
//
//        <h3>Solve it</h3>
//        <section>
//          Add following code to app.js
//          <pre><code>app.get("/hello", (req, res) => res.end("world"));</code></pre>
//          You can find a complete solution <a target="_blank" href="https://github.com/restcoder/Starter-Hello-world">here <i className="fa fa-external-link"/></a>
//        </section>
//
//        <h3>Running code locally</h3>
//        <section>
//          Install dependencies from package.json
//          <pre><code>
//            <span className="nv">$ </span>npm install<br/>
//          </code></pre>
//          We recommend using <a href="https://github.com/strongloop/node-foreman">node foreman <i
//          className="fa fa-external-link"/></a>
//          <pre><code>
//            <span className="nv">$ </span>nf start<br/>
//            <span className={styles.yellow}>[WARN] No ENV file found</span><br/>
//<span className={styles.success}>[OKAY] Trimming display Output to 243 Columns</span><br/>
//<span className={styles.cyan}>11:25:48 AM web.1 |</span>  Listening on 5000<br/>
//<span className={styles.cyan}>11:25:48 AM web.1 |</span>  READY
//
//          </code></pre>
//          Open <code>{'http://localhost:5000/hello'}</code>
//          <br/>
//          You should see output: <code>world</code>
//          {this.renderForemanImportant()}
//        </section>
//        {this.renderSubmitCodeSection('nodejs@4.4.4')}
//      </div>
//    );
//  }

  renderJava() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting started with Java</h1>
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

        {this.renderCheckoutCode('java')}

        <h3>Solve it</h3>
        <section>
          Add following code to src/main/java/Main.java
          <pre><code>get("/hello", (req, res) -> "world")</code></pre>
          You can find a complete solution <a target="_blank" href="https://github.com/restcoder/Starter-Hello-world">here
          <i className="fa fa-external-link"/></a>
        </section>

        <h3>Running code locally</h3>
        <section>
          Install dependencies from pom.xml
          <pre><code>
            <span className="nv">$ </span>mvn install<br/>
          </code></pre>
          We recommend using <a href="https://github.com/strongloop/node-foreman">node foreman <i
          className="fa fa-external-link"/></a>
          <pre><code>
            <span className="nv">$ </span>nf start<br/>
            <span className={styles.yellow}>[WARN] No ENV file found</span><br/>
            <span className={styles.success}>[OKAY] Trimming display Output to 243 Columns</span><br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> [Thread-0] INFO spark.webserver.SparkServer - == Spark has ignited ...<br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> [Thread-0] INFO spark.webserver.SparkServer - >> Listening on 0.0.0.0:5000<br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> [Thread-0] INFO org.eclipse.jetty.server.Server - jetty-9.0.2.v20130417<br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> {'[Thread-0] INFO org.eclipse.jetty.server.ServerConnector - Started ServerConnector@397f5f60{HTTP/1.1}{0.0.0.0:5000}'}<br/>
            <span className={styles.cyan}>12:14:53 PM web.1 |</span> READY
          </code></pre>
          Open <code>{'http://localhost:5000/hello'}</code>
          <br/>
          You should see output: <code>world</code>
          {this.renderForemanImportant()}
        </section>
        {this.renderSubmitCodeSection('java@1.8.0')}
      </div>
    );
  }

  renderLanguage(lang) {
    switch (lang) {
      case 'nodejs':
        return <NodejsSetup />;
      case 'java':
        return this.renderJava();
      default:
        return this.renderDefaultContent();
    }
  }

  renderContent() {
    const params = this.props.routeParams || {};
    switch (params.topic) {
      case 'getting-started':
        return this.renderLanguage(params.subtopic);
      case 'procfile':
        return <ProcfileInfo/>;
      default:
        return this.renderDefaultContent();
    }
  }

  renderDefaultContent() {
    return (
      <div className="text-center">
        <h1>Getting Started on RestCoder</h1>
        <p>Please choose topic from <span className="hidden-xs">left</span> menu</p>
      </div>
    );
  }

  renderLink(text, topic, subtopic) {
    const params = this.props.routeParams || {};
    let className;
    if (params.topic === topic && params.subtopic === subtopic) {
      className = 'active';
    }
    let url;
    if (subtopic) {
      url = `/help/${topic}/${subtopic}`;
    } else {
      url = `/help/${topic}`;
    }
    return (
      <li className={className}>
        <Link to={url}>{text}</Link>
      </li>);
  }

  render() {
    return (
      <App>
        <div className={'container ' + styles.Help}>
          <div className="row">
            <div className="col-sm-3">
              <ul className="nav nav-list">
                <li className="nav-header">Getting started</li>
                <li >
                  <ul className="nav nav-list">
                    {this.renderLink('Node.js', 'getting-started', 'nodejs')}
                    {this.renderLink('Java', 'getting-started', 'java')}
                    {this.renderLink('Ruby', 'getting-started', 'ruby')}
                    {this.renderLink('Python', 'getting-started', 'python')}
                    {this.renderLink('.NET', 'getting-started', 'dotnet')}
                  </ul>
                </li>
                <li className="divider"/>
                <li className="nav-header">General</li>
                {this.renderLink('RestCoder CLI tool', 'cli-tool')}
                {this.renderLink('Procfile and foreman', 'procfile')}
                {this.renderLink('Platform information', 'platform-information')}
                {this.renderLink('Limitations', 'limitations')}
              </ul>
            </div>

            <div className="col-sm-9">
              {this.renderContent()}
            </div>

          </div>
        </div>
      </App>
    );
  }
}
