import React, {PropTypes} from 'react';
import styles from './Help.scss';

export default class SubmitCodeSection extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    fileCount: PropTypes.number.isRequired,
  };

  render() {
    const {lang, fileCount} = this.props;

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
Found {fileCount} file(s)<br/>
Packing source code... <span className={styles.success}>Success</span><br/>
Submitting source code...<br/>
Submitting source code... <span className={styles.success}>Success</span><br/>
<span className={styles.yellow}><strong>Problem</strong>: Starter: Hello world</span><br/>
<span className={styles.yellow}><strong>Language</strong>: {lang}</span><br/>
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
}
