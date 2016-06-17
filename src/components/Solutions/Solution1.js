import React, { PropTypes } from 'react';
import _ from 'underscore';
import {Link} from 'react-router';
import scroll from 'scroll';
import {BashCode, ExternalLink} from '../';
import styles from './Solution1.scss';
import Codemirror from '../Examples/CodeMirror';
import RunInPostman from '../Examples/RunInPostman';
import {nodejsSolution, rubySolution, pythonSolution, javaSolution, dotnetSolution} from './solution1Codes';
import $ from 'jquery';

if (__CLIENT__) {
  require('codemirror/mode/javascript/javascript');
  require('codemirror/mode/ruby/ruby');
  require('codemirror/mode/python/python');
  require('codemirror/mode/clike/clike');
}

export default class Solution1 extends React.Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
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
      mode,
      readOnly: true,
      theme: 'material'
    };
  }

  setStep(step) {
    this.setState({step}, () => {
      const isFirefox = typeof InstallTrigger !== 'undefined';
      const offset = $('.tab-content').offset().top + 20;
      scroll.top(isFirefox ? document.documentElement : document.body, offset);
    });
  }

  renderMenuItem(text) {
    if (_.isArray(text)) {
      return (
        <ul key={text} className="nav nav-list">
          {text.map(::this.renderMenuItem)}
        </ul>
      );
    }
    return (
      <li key={text} onClick={() => this.setState({step: text})} className={this.state.step === text ? 'active' : ''}>
        <a>{text}</a>
      </li>
    );
  }
  renderNextBtn(step) {
    return (
      <div className="mtm text-center">
        <a className="btn btn-inverse btn-wide btn-sm" onClick={() => this.setStep(step)}>Next</a>
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
        <br/>
        Change your working directory:
        <BashCode>cd starter-hello</BashCode>
        {this.renderNextBtn('Solve')}
      </div>
    );
  }

  renderSolve() {
    const size = 100;
    const renderImg = (imageName, step) => {
      return (
        <a onClick={() => this.setStep(step)}>
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
        {this.renderNextBtn('Test locally with Postman')}
      </div>
    );
  }

  renderSolveRuby() {
    return (
      <div>
        <h4>Solve in Ruby</h4>
        <ExternalLink href="/help/getting-started/ruby">Please check the Help section how to install and setup Ruby</ExternalLink>
        <br/>
        Install gems
        <BashCode>bundler install</BashCode>
        By default <code>app.rb</code> contains an empty sinatra application. It doesn't contain any endpoints.<br/>
        Replace the whole content by below code:
        <Codemirror className="mvl" {...this.getCodeOpts('ruby')} value={rubySolution}/>
        {this.renderNextBtn('Test locally with Postman')}
      </div>
    );
  }

  renderSolvePython() {
    return (
      <div>
        <h4>Solve in Python</h4>
        <ExternalLink href="/help/getting-started/python">Please check the Help section how to install and setup Python</ExternalLink>
        <br/>
        Install packages
        <BashCode>pip install -r requirements.txt</BashCode>
        By default <code>app.py</code> contains an empty flask application. It doesn't contain any endpoints.<br/>
        Replace the whole content by below code:
        <Codemirror className="mvl" {...this.getCodeOpts('python')} value={pythonSolution}/>
        {this.renderNextBtn('Test locally with Postman')}
      </div>
    );
  }

  renderSolveJava() {
    return (
      <div>
        <h4>Solve in Java</h4>
        <ExternalLink href="/help/getting-started/java">Please check the Help section how to install and setup Java</ExternalLink>
        <br/>
        Install packages
        <BashCode>mvn install</BashCode>
        By default <code>src/main/java/Main.java</code> contains an empty spark application. It doesn't contain any endpoints.<br/>
        Replace the whole content by below code:
        <Codemirror className="mvl" {...this.getCodeOpts('clike')} value={javaSolution}/>
        <strong>Make sure to recompile sources! Run:</strong>
        <BashCode>mvn package</BashCode>
        {this.renderNextBtn('Test locally with Postman')}
      </div>
    );
  }

  renderSolveDotnet() {
    return (
      <div>
        <h4>Solve in .NET</h4>
        <ExternalLink href="/help/getting-started/dotnet">Please check the Help section how to install and setup .NET</ExternalLink>
        <br/>
        Install packages
        <BashCode>nuget restore -NonInteractive</BashCode>
        By default <code>Program.cs</code> contains an empty web application. It doesn't contain any endpoints.<br/>
        Replace the whole content by below code:
        <Codemirror className="mvl" {...this.getCodeOpts('clike')} value={dotnetSolution}/>
        <strong>Make sure to recompile sources! Run:</strong>
        <BashCode>xbuild</BashCode>
        {this.renderNextBtn('Test locally with Postman')}
      </div>
    );
  }

  renderTestLocally() {
    const {challenge} = this.props;
    return (
      <div>
        <h4>Test locally with Postman</h4>

        The restcoder CLI can start your application.<br/>
        Simply run:
        <BashCode>restcoder start</BashCode>


        Click below button to import a postman collection. <br/>

        <div className="mvm">
          <RunInPostman collectionId={challenge.postmanCollectionId} />
        </div>

        Two routes should be automatically imported to your Postman application.<br/>
        Routes have format like: <code>{"{{URL}}/hello"}</code><br/>
        The <code>URL</code> is a postman variable and it represents a base URL for your API.<br/>
        If you use a default port it should be equal to <code>http://localhost:5000</code><br/>

        You can create a custom environment manually and set above variable or import it in the following way:
        <br/>
        <ul>
          <li>
            Click from the left menu: <strong>Import</strong> -> <strong>Import From Link</strong>
          </li>
          <li>
            Enter URL: <code>{"http://bit.ly/1Q0etJo"}</code> and click <strong>Import</strong>
          </li>
          <li>
            In the right menu switch from <code>No environment</code> to <code>RestCoder</code>
          </li>
        </ul>
        Now you are ready to test your API in Postman!<br/>
        Notice that every Postman endpoint contains a test suite. If you made any mistake you should be able to detect issues quickly.

        <br/><br/>

        Problems? Watch the video below!
        <div className="text-center mvm">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/cqP4G8fYKZU" frameBorder="0" allowFullScreen/>
        </div>

        {this.renderNextBtn('Test locally with CLI')}
      </div>
    );
  }

  renderTestLocallyCLI() {
    return (
      <div>
        <h4>Test locally with CLI</h4>

        You can run Postman tests automatically in the CLI.<br/>
        Start your application:<br/>
        <BashCode>restcoder start</BashCode>
        Open a new terminal window and run:<br/>
        <BashCode>restcoder test</BashCode>

        <div className={styles.consoleImg}>
          <img width="762" height="312" src="https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/solution-1/test-cli.gif"/>
        </div>

        <p>
          <strong>Important!</strong><br/>
          Local tests don't guarantee that your application is 100% correct.<br/>
          It can help you to catch common mistakes like missing headers, invalid status codes or wrong json format.<br/>
          Only RestCoder tests will verify all uses cases of your application.
        </p>

        {this.renderNextBtn('Submit')}
      </div>
    );
  }

  renderSubmit() {
    return (
      <div>
        <h4>Submit</h4>

        If you are ready to submit just run:<br/>
        <BashCode>restcoder submit</BashCode>
        and wait for the result..

        <div className={styles.consoleImg}>
          <img width="746" height="374" src="https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/solution-1/hello-world-submit.gif"/>
        </div>

        <strong>Congratulations!</strong><br/>
        You solved your first challenge. In the next challenge you will be using a database.


        <div className="mvl text-center">
          <Link to="/challenge/2" className="btn btn-inverse btn-wide " >Solve next challenge</Link>
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
      'Test locally with Postman',
      'Test locally with CLI',
      'Submit',
    ];
    const steps = {
      Setup: 'renderSetup',
      'Checkout code': 'renderCheckoutCode',
      Solve: 'renderSolve',
      'Node.js': 'renderSolveNodejs',
      'Ruby': 'renderSolveRuby',
      'Python': 'renderSolvePython',
      'Java': 'renderSolveJava',
      '.NET': 'renderSolveDotnet',
      'Test locally with Postman': 'renderTestLocally',
      'Test locally with CLI': 'renderTestLocallyCLI',
      'Submit': 'renderSubmit',
    };
    const fn = this[steps[step]];

    return (
      <div className="row">
        <div className="col-sm-3">
          <ul className="nav nav-list">
            {menu.map(::this.renderMenuItem)}
          </ul>
        </div>
        <div className="col-sm-9" key={step}>
          {fn && fn.bind(this)()}
        </div>
      </div>
    );
  }
}
