import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';
import {ExternalLink, BashCode} from '../';

export default class ProcfileInfo extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Procfile</h1>
        <h3>Procfile</h3>
        <section>
          Procfile is a file that declares how your application will be started.<br/>
          It has following format:
          <pre><code>{'<process name>: <command>'}</code></pre>
          Usually the <code>web</code> process is always required, but sometimes you must include additional processes.

          <br/>
          Example Procfile for Node.js.<br/>

          <pre><code>web: node app.js</code></pre>

          Example Procfile for Java.<br/>
          <pre><code>{'web: java -cp target/classes:target/dependency/* Main'}</code></pre>
          <strong>Important Windows users:</strong><br/>
          This must be a linux command. Use always slashes <code>/</code>, not backslashes <code>\</code>.<br/>
          You can define a Windows version of all commands in <code>Procfile.windows</code>.<br/>

          <br/>
          Example with multiple processes.<br/>
          In <Link to="/challenge/4">Starter: Background worker</Link> you must create an extra worker process.<br/>
          Procfile will contain two lines:
          <pre><code>{'web: <startup script>'}<br/>{'worker: <worker script>'}</code></pre>
          <strong>Important:</strong> it's not allowed to include any additional processes, by default you can define only a <code>web</code> process.
        </section>
        <h3>Running Profile locally</h3>
        <section>
          You can start your application using the CLI tool.
          <BashCode>restcoder start</BashCode>
          <h4>The <code>.env</code> file</h4>
          The <code>.env</code>file must contains all environmental variables that are required by your application (except <code>PORT</code>).<br/>
          They are used only for local development. If any variable is missing the CLI tool will automatically throw an error.

          <br/>
          Example:<br/>
          In <Link to="/challenge/2">Starter: Database connection</Link> problem, you must set a
          <code>POSTGRES_URL</code> variable.
          <br/>
          You can create a <code>.env</code> file with the following content:
          <pre><code>
            POSTGRES_URL="postgres://localhost:5432/mydb"
          </code></pre>
          <h4>Default port</h4>
          The <code>PORT</code> variable is always set by the CLI automatically with a default value <code>5000</code>.
          <br/>
          You can override it by adding a <code>-p</code> parameter. For example: <code>restcoder start -p 5555</code>

          <h4>Multiple instances</h4>
          It's possible to run multiple instances of a single process.<br/>
          Each process has an additional automatic environment variable, <code>FOREMAN_WORKER_NAME</code>, that contains the process name and number. <br/>

          The CLI tool will automatically run your application in multiple instances depending on the problem requirements.<br/>

          For example: in <Link to="/challenge/3">Starter: Multiple instances</Link> problem there are two instances of <code>web</code> process.<br/>
          if you start the application using <code>restcoder start</code> you will see output:<br/>
          <pre><code>
          [OKAY] Starting Proxy Server [web] on port 5000 -> (5001-5002)
          </code></pre>
          The first web process has <code>FOREMAN_WORKER_NAME</code> set to <code>web.1</code> and listens on PORT <code>5001</code><br/>
          The second web process has <code>FOREMAN_WORKER_NAME</code> set to <code>web.2</code> and listens on PORT <code>5002</code><br/>
          Additionally there is a proxy between above two processes on PORT <code>5000</code>.<br/>
          If you test your API you should use the proxy PORT to ensure your application is stateless.<br/>
          That means:
          <ul>
            <li>You should not use any global variables to store state.</li>
            <li>You should commit your database session and complete all transactions.<br/>Make sure to properly configure your ORM (if you use any).</li>
          </ul>


        </section>
      </div>
    );
  }
}
