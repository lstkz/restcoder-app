import React, { PropTypes } from 'react';
import _ from 'underscore';
import {Link} from 'react-router';
import {BashCode, ExternalLink} from '../';
import styles from './Solution1.scss';
import Codemirror from '../Examples/CodeMirror';
import RunInPostman from '../Examples/RunInPostman';
import {nodejsSolution} from './solution1Codes';


if (__CLIENT__) {
  require('codemirror/mode/javascript/javascript');
}

export default class Solution1 extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      step: 'Setup'
    };
  }

  getCodeOpts(mode) {
    return {
      autoRefresh: true,
      lineNumbers: false,
      mode: 'application/ld+json',
      readOnly: true,
      theme: 'material'
    }
  }

  renderMenuItem(text) {
    if (_.isArray(text)) {
      return (
        <ul className="nav nav-list">
          {text.map(::this.renderMenuItem)}
        </ul>
      );
    }
    return (
      <li onClick={() => this.setState({step: text})} className={this.state.step === text ? 'active' : ''}>
        <a>{text}</a>
      </li>
    );
  }
  renderNextBtn(step) {
    return (
      <div className="mtm text-center">
        <a className="btn btn-inverse btn-wide btn-sm" onClick={() => this.setState({step})}>Next</a>
      </div>
    );
  }

  renderSetup() {
    return (
      <div>
        <h4>Setup</h4>
        This guide assumes that you have finished the <Link to="/tutorial">tutorial</Link>. The RestCoder CLI tool and Postman must be installed.
        {this.renderNextBtn('Checkout code')}
      </div>
    );
  }

  renderCheckoutCode() {
    return (
      <div>
        <h4>Checkout</h4>
        Open a terminal and run the following command:<br/>
        <BashCode>restcoder init 1</BashCode>
        You will be asked to choose your target language.
        {this.renderNextBtn('Solve')}
      </div>
    );
  }

  renderSolve() {
    const size = 100;
    const renderImg = (imageName, step) => {
      return (
        <a onClick={() => this.setState({step})}>
          <img
            className={styles.langImage}
            width={size}
            height={size}
            alt={step}
            title={step}
            src={require('../../containers/Landing/languages/' + imageName)} />
        </a>
      );
    };
    return (
      <div>
        <h4>Solve</h4>
        Pick the language below too see a complete solution.<br/>

        <div className="text-center">
          {renderImg('icon-nodejs.svg', 'Node.js')}
          {renderImg('icon-ruby.svg', 'Ruby')}
          {renderImg('icon-python.svg', 'Python')}
          {renderImg('icon-java.svg', 'Java')}
          {renderImg('net.png', '.NET')}
        </div>
      </div>
    );
  }

  renderSolveNodejs() {
    return (
      <div>
        <h4>Solve in Node.js</h4>
        <ExternalLink href="/help/getting-started/nodejs">Please check the Help section how to install and setup Node.js</ExternalLink>
        <br/>
        Install npm dependencies
        <BashCode>npm install</BashCode>
        By default <code>app.js</code> contains an empty expressjs application. It doesn't contain any endpoints.<br/>
        Replace the whole content by below code:
        <Codemirror className="mvl" {...this.getCodeOpts('javascript')} value={nodejsSolution}/>
        {this.renderNextBtn('Test locally')}
      </div>
    );
  }

  renderTestLocally() {
    return (
      <div>
        <h4>Test Locally</h4>

        The restcoder CLI can start your application.<br/>
        Simply run:
        <BashCode>restcoder start</BashCode>

        <small>Please check the Help section from the top menu. It contains more information about starting.</small>
        <br/>
        <br/>

        Click below button to import a postman collection. <br/>
        <small>(You can find it also in the Examples tab)</small>

        <div className="mvm">
          <RunInPostman />
        </div>

      </div>
    );
  }

  render() {
    const {step} = this.state;
    const menu = [
      'Setup',
      'Checkout code',
      'Solve',
      [
        'Node.js',
        'Ruby',
        'Python',
        'Java',
        '.NET',
      ],
      'Test locally',
      'Submit',
    ];
    const steps = {
      Setup: 'renderSetup',
      'Checkout code': 'renderCheckoutCode',
      Solve: 'renderSolve',
      'Node.js': 'renderSolveNodejs',
      'Test locally': 'renderTestLocally',
    };
    const fn = this[steps[step]];

    return (
      <div className="row">
        <div className="col-sm-3">
          <ul className="nav nav-list">
            {menu.map(::this.renderMenuItem)}
          </ul>
        </div>
        <div className="col-sm-9">
          {fn && fn.bind(this)()}
        </div>
      </div>
    );
  }
}
