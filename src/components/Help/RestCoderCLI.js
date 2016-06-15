import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {ExternalLink, BashCode} from '../';

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
          Install <ExternalLink target="_blank" href="https://nodejs.org">Node.js</ExternalLink> (version 4 or 6)
          <br/>
          Install RestCoder CLI
        <BashCode>npm i -g restcoder-cli</BashCode>
        </section>

        <h3>Usage</h3>
        <section>
          Type to see full usage:
          <BashCode>restcoder -h</BashCode>
          Type to see full usage of a specific command:
          <BashCode>restcoder submit -h</BashCode>
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


        <h3>Ignoring files</h3>
        <section>
          You should never include any compiled or built libraries in your solution. <br/>
          You can define ignore rules in <code>.restcoderignore</code>.
          Same syntax from git is supported. <ExternalLink href="https://git-scm.com/docs/gitignore">See here </ExternalLink>
          <br/>
          All languages contain default rules (for example: node_modules is ignored by default for nodejs, bin and obj are ignored for .NET)
        </section>

      </div>
    );
  }
}
