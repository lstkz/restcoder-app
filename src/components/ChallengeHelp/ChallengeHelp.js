import React, { PropTypes } from 'react';
import styles from './ChallengeHelp.scss';

export default class ChallengeHelp extends React.Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired
  };

  render() {
    const {challenge: {slug, id}} = this.props;

    return (
      <div className={styles.ChallengeHelp}>
        <h2>Getting started</h2>

        <h4>Install Nodejs</h4>

        <div className="item">
          Version 4 or 5 is required <a href="https://nodejs.org" target="_blank">https://nodejs.org</a>
        </div>

        <h4>Install CLI tool</h4>

        <div className="item">
          <pre><code><span className="nv">$ </span>npm install -g restcoder-cli</code></pre>
        </div>

        <h4>Login with your username and password</h4>

        <div className="item">

          <div className="row">
            <div className="col-md-12">
              <pre><code><span className="nv">$ </span>restcoder login</code></pre>
            </div>
            <div className="col-md-8 hidden">
              <div className="img-wrapper">
                <img src={require('./login.gif')} />
              </div>
            </div>
          </div>
        </div>

        <h4>Initialized code with a starter template</h4>

        <div className="item">
          Create new directory<br/>
          <pre><code><span className="nv">$ </span>mkdir {slug}</code></pre>
          <pre><code><span className="nv">$ </span>cd {slug}</code></pre>
          Download code template<br/>
          <pre><code><span className="nv">$ </span>restcoder init {id}</code></pre>
          Where <code>{id}</code> is the problem id you are trying to solve.<br/>
          You will be asked to choose your target language.
        </div>
        <h4>Ready to submit?</h4>

        <div className="item">
          <pre><code><span className="nv">$ </span>restcoder submit</code></pre>
        </div>
      </div>
    );
  }
}
