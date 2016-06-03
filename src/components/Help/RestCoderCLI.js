import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';

export default class RestCoderCLI extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">RestCoder CLI tool</h1>
        <section>
          The <code>restcoder</code> command-line tool is an interface to the RestCoder Platform API.<br/>
          It allows you to initialize a starter template for a given problem and submit your solution for verification. <br/>
          It's not possible to submit code via website, because your solution always contains several files and it's not convenience to zip them and upload manually.
        </section>

        <h3>Setup</h3>
        <section>
          Install <a target="_blank" href="https://nodejs.org">Node.js <i className="fa fa-external-link"/> (version 4 or 6)</a>
          <br/>
          Install RestCoder CLI
        <pre><code>
          <span className="nv">$ </span>npm i -g restcoder-cli<br/>
        </code></pre>
        </section>

        <h3>Logging in</h3>
        <section>
          You must login with your RestCoder account for the first time.<br/>
          Your credentials will be stored in <code>{'~/.restcoderrc'}</code>.

        <pre><code>
          <span className="nv">$ </span>restcoder login<br/>
          <span className={styles.gray}>Your username:</span> myUsername<br/>
          <span className={styles.gray}>Your password:</span> <br/>
          Authenticated successfully
        </code></pre>
        </section>

        <h3>Initialize source code</h3>
        <section>
          Execute the checkout code command from the problem statement.<br/>
          Example for <Link to="/challenges/1">Starter: Hello world</Link>
        <pre><code>
          <span className="nv">$ </span>restcoder init 1<br/>
        </code></pre>
          You will be asked to choose your target language. Use arrows to navigate and press ENTER to confirm your selection.
          <br/>
          Optionally there will be additional services to choose.<br/>
          For example: in <Link to="/challenges/5">{'TODO list'}</Link> you can choose one type of database. Either postgres, mysql or mongodb.
          <br/>
          Code is always initialized in current directly.<br/>
          All information will be saved to <code>.restcoderrc</code> (Problem ID, selected language and additional services).
          <br/>
        </section>

        <h3>Ignoring files</h3>
        <section>
          You should never include any compiled or built libraries in your solution. <br/>
          You can define ignore rules in <code>.restcoderignore</code>.
          Same syntax from git is supported. <a target="_blank" href="https://git-scm.com/docs/gitignore">See here <i className="fa fa-external-link"/></a>
          <br/>
          All languages contain default rules (for example: node_modules is ignored by default for nodejs, bin and obj are ignored for .NET)
        </section>

        <h3>Submitting source code</h3>
        <section>
          Simply run
        <pre><code>
          <span className="nv">$ </span>restcoder submit<br/>
        </code></pre>
          and you will see tests results in your console.
        </section>
      </div>
    );
  }
}
