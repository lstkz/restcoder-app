import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';
import CheckoutCodeSection from './CheckoutCodeSection';
import SubmitCodeSection from './SubmitCodeSection';
import VersionWarning from './VersionWarning';
import RunForeman from './RunForeman';

export default class PythonSetup extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting Started with Python</h1>
        <h3>Setup</h3>
        <section>
          Install <Link to="/help/cli-tool">RestCoder CLI tool</Link>
        </section>
        <section>
          Install <a target="_blank" href="http://docs.python-guide.org/en/latest/starting/installation/">Python <i className="fa fa-external-link"/></a>
          <br/>
          Install <a target="_blank" href="https://pip.pypa.io/en/stable/installing/">pip <i className="fa fa-external-link"/></a>
          <br/>
          Install <a target="_blank" href="https://github.com/kennethreitz/python-guide/blob/master/docs/dev/virtualenvs.rst">Virtualenv <i className="fa fa-external-link"/></a> (recommended)
          <br/>
          Check if python is properly installed:
          <br/>
          <pre><code>
            <span className="nv">$ </span>python --version<br/>
            Python 2.7.10
          </code></pre>
          <pre><code>
            <span className="nv">$ </span>pip --version<br/>
           pip 8.1.2 from /Library/Python/2.7/site-packages (python 2.7)
          </code></pre>
        </section>

        <CheckoutCodeSection lang="python"/>

        <h3>Define Python version</h3>
        <section>
          You can define a target version in runtime.txt. <br/>
          Example: Use Python 2.7
          <pre><code>python-2.7</code></pre>
          <VersionWarning/>
        </section>

        <h3>Solve it</h3>
        <section>
          Add following code to <code>app.py</code>
          <pre><code>
@app.route("/hello")<br/>
def hello():<br/>    return "world"
</code></pre>
          You can find a complete solution <a target="_blank" href="https://github.com/restcoder/Starter-Hello-world">here <i
            className="fa fa-external-link"/></a>
        </section>

        <h3>Running code locally</h3>
        <section>
          Install dependencies from requirements.txt
        <pre><code><span className="nv">$ </span>pip install -r requirements.txt<br/></code></pre>
          <RunForeman>
            <span className="nv">$ </span>nf start<br/>
            <span className={styles.yellow}>[WARN] No ENV file found</span><br/>
            <span className={styles.success}>[OKAY] Trimming display Output to 243 Columns</span><br/>
            <span className={styles.cyan}>7:31:53 PM web.1 |</span>   * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)<br/>
            <span className={styles.cyan}>7:31:54 PM web.1 |</span>  READY
          </RunForeman>
        </section>
        <SubmitCodeSection lang="python@2.7.11" fileCount={4} />
      </div>
    );
  }
}
