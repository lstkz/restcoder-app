import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';

export default class ProcfileInfo extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Procfile and foreman</h1>
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
          <strong>Important Windows users:</strong> this must be a linux command. Use always slashes <code>/</code>, not backslashes <code>\</code>.

          <br/>
          <br/>
          Example with multiple processes.<br/>
          In <Link to="/challenge/4">Starter: Background worker</Link> you must create an extra worker process.<br/>
          Procfile will contain two lines:
          <pre><code>{'web: <startup script>'}<br/>{'worker: <worker script>'}</code></pre>
          <strong>Important:</strong> it's not allowed to include any additional processes, by default you can define only a <code>web</code> process.
        </section>
        <h3>Running Profile locally</h3>
        <section>
          We recommend using <a href="https://github.com/strongloop/node-foreman">node foreman <i
          className="fa fa-external-link"/></a>.
          <br/>
          <h4>The <code>.env</code> file</h4>
          Node foreman can read automatically environmental variables from the <code>.env</code>file.
          <br/>
          Example:<br/>
          In <Link to="/challenge/2">Starter: Database connection</Link> problem, you must set a
          <code>POSTGRES_URL</code> variable.
          <br/>
          You can create a <code>.env</code> file with the following content:
          <pre><code>
            POSTGRES_URL="postgres://localhost:5432/mydb"
          </code></pre>
          <strong>Important:</strong> <code>.env</code> file is ignored by RestCoder tester. Never override any provided variables in your code.
          <h4>Default port</h4>
          The <code>PORT</code> variable is always set by foreman automatically with a default value <code>5000</code>.
          <br/>
          You can override it by adding a <code>-p</code> parameter. For example: <code>nf start -p 5555</code>

          <h4>Multiple instances</h4>
          It's possible to run multiple instances of a single process.<br/>
          Each process has an additional automatic environment variable, <code>FOREMAN_WORKER_NAME</code>, that contains the process name and number. <br/>
          Example: for command <code>nf start web=4 worker=2</code><br/> there will be
          <code>web.1</code>, <code>web.2</code>, <code>web.3</code>, <code>web.4</code>,
          <code>worker.1</code>, <code>worker.2</code>
          <br/>
          <strong>Important:</strong> RestCoder tester will also set the <code>FOREMAN_WORKER_NAME</code> variable automatically.<br/>
          If you must initialize any database schema, do it only if <code>FOREMAN_WORKER_NAME</code> is equal to <code>web.1</code>.<br/>
          See example problem: <Link to="/challenge/3">Starter: Multiple instances</Link>
          <br/>
          <strong>Important:</strong> Always read problem statements carefully. Sometimes there is only 1 instances of a process, but sometimes there are multiple.
          <br/>
        </section>
      </div>
    );
  }
}
