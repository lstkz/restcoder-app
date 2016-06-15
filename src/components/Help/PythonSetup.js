import React, {PropTypes} from 'react';
import styles from './Help.scss';
import VersionWarning from './VersionWarning';
import {ExternalLink, BashCode} from '../';

export default class PythonSetup extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting Started with Python</h1>
        <h3>Setup</h3>
        <section>
          Install <ExternalLink href="http://docs.python-guide.org/en/latest/starting/installation/">Python</ExternalLink>
          <br/>
          Install <ExternalLink href="https://pip.pypa.io/en/stable/installing/">pip</ExternalLink>
          <br/>
          Install <ExternalLink href="https://github.com/kennethreitz/python-guide/blob/master/docs/dev/virtualenvs.rst">Virtualenv</ExternalLink> (recommended)
          <br/>
          Check if python is properly installed:
          <br/>
          <BashCode>python --version<br/>
            Python 2.7.10
          </BashCode>
          <BashCode>pip --version<br/>
           pip 8.1.2 from /Library/Python/2.7/site-packages (python 2.7)
          </BashCode>
        </section>

        <h3>Define Python version</h3>
        <section>
          You can define a target version in runtime.txt. <br/>
          Example: Use Python 2.7
          <pre><code>python-2.7</code></pre>
          <VersionWarning/>
        </section>
      </div>
    );
  }
}
