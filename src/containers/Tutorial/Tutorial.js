import React, {PropTypes} from 'react';
import styles from './Tutorial.scss';
import {App} from '../';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as actions from '../../redux/modules/challengeDetails';
import {PageTitle, ExternalLink, BashCode} from '../../components';
import Helmet from 'react-helmet';
import {Link} from 'react-router';

@asyncConnect([{
  promise: () => Promise.resolve()
}])
@connect(state => state, actions)
export default class Tutorial extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      step: 0
    };
  }

  renderNextBtn() {
    return (
      <a className="btn btn-inverse btn-wide" onClick={() => this.setState({step: this.state.step + 1})}>Next</a>
    );
  }

  renderNextBtnWithProblem() {
    return (
      <div>
        <div className="text-center">
          {this.renderNextBtn()}
        </div>
        <div className="text-center">
          <small><Link to="/category/4/comments-feedback" target="_blank"> (Problems? Report it here)</Link></small>
        </div>
      </div>
    );
  }

  renderMenuItem(text, step) {
    return (
      <li key={step} onClick={() => this.setState({step})} className={this.state.step === step ? 'active' : ''}>
        <a>{text}</a>
      </li>
    );
  }

  renderIntroduction() {
    return (
      <div>
        <h3 className="text-center">Introduction</h3>
        <section>
          Welcome to the first online judge for software developers!<br/>
          On our RestCoder platform you can practice how to create professional applications with the
          {' '}
          <ExternalLink href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST</ExternalLink> architectural style
          <br/>
          Before you can solve any practice challenges you must setup required tools.<br/>
          It shouldn't take more than 5 minutes!
        </section>
        <div className="text-center">
          {this.renderNextBtn()}
        </div>
      </div>
    );
  }

  renderCLI() {
    return (
      <div>
        <h3 className="text-center">RestCoder CLI</h3>
        <section>
          The <code>restcoder</code> command-line tool is an interface to the RestCoder Platform API.<br/>

          RestCoder CLI requires <ExternalLink href="https://nodejs.org/">Node.js</ExternalLink>
          in version 4+.<br/><br/>

          Open your terminal (Linux/Mac) or command prompt (Windows).<br/>
          Enter:
          <BashCode>node -v</BashCode>
          It should output a version above <code>v4</code>.<br/>
          <strong>Warning:</strong> versions 0.10 or 0.12 won't work!
          <br/><br/>

          Install the CLI tool<br/>
          <BashCode>npm i -g restcoder-cli</BashCode>
          if you receive an EACCESS error please check <ExternalLink
          href="https://docs.npmjs.com/getting-started/fixing-npm-permissions">this article</ExternalLink>.
          <br/><br/>
          Login with your account.<br/>
          Use your username and password from RestCoder.<br/>
          <BashCode>restcoder login<br/>
            <span className="c-gray">Your username:</span> myUsername<br/>
            <span className="c-gray">Your password:</span> <br/>
            Authenticated successfully</BashCode>
        </section>
        {this.renderNextBtnWithProblem()}
      </div>
    );
  }

  renderReady() {
    const { setAutoRunTour } = this.props;
    return (
      <div>
        <h3 className="text-center">You are all set!</h3>
        <section className="text-center mvh">
          Are you ready to solve your first challenge?
        </section>
        <div className="text-center">
          <Link to="/challenge/1" onClick={() => setAutoRunTour(true)}>
            <button className="btn btn-inverse btn-wide">Solve your first challenge</button>
          </Link>
        </div>
      </div>
    );
  }


  renderPostman() {
    return (
      <div>
        <h3 className="text-center">Install Postman</h3>
        <section>
          <ExternalLink href="https://www.getpostman.com/">Postman</ExternalLink>
          {' '}
          is an application for testing REST APIs. <br/>
          It's not required, but we highly recommend to install Postman, because it wil speed up your development.

          <div className="text-center mvl">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/8veXJ9YGlFI" frameBorder="0"
                    allowFullScreen></iframe>
          </div>

          <div className="text-center mvh">
            <a href="https://www.getpostman.com/" target="_blank">
              <button className="btn btn-danger btn-lg">Download postman</button>
            </a>
          </div>

          <div className="text-center">
            {this.renderNextBtn()}
          </div>
        </section>
      </div>
    );
  }

  renderSampleAPI() {
    return (
      <div>
        <h3 className="text-center">Run a sample API</h3>
        <section>
          Sample API has only one route: <code>GET /test</code><br/>

          Open your terminal and type:<br/>
          <BashCode>restcoder tutorial</BashCode>
          It will create a sample nodejs app in the directory <code>restcoder-tutorial</code>.<br/>

          Change your working directory:
          <BashCode>cd restcoder-tutorial</BashCode>

          The CLI can start your application automatically.<br/>
          Just run a command:
          <BashCode>restcoder start</BashCode>

          <div className={styles.consoleImg}>
            <img width="666" height="270" src="https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/tutorial/tutorial.gif"/>
          </div>

        </section>
        {this.renderNextBtnWithProblem()}
      </div>
    );
  }

  renderTestAPI() {
    return (
      <div>
        <h3 className="text-center">Test a sample API</h3>
        <section>
          Every API application must be tested in some way.<br/>
          You can just open <a href="http://localhost:5000/test" target="_blank">http://localhost:5000/test</a> in your browser and see the output. <br/>
          However such format is not user friendly.<br/>

          Open postman and test above URL.
  
          <div className="text-center mvm">
            <img className="img-responsive"
                 width="788"
                 height="530"
                 src="https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/tutorial/postman.gif"/>
          </div>

        </section>
        {this.renderNextBtnWithProblem()}
      </div>
    );
  }


  render() {
    const { step } = this.state;
    const { auth: { user } } = this.props;
    const menu = [
      'Introduction',
      'RestCoder CLI',
      'Install Postman',
      'Run a sample API',
      'Test a sample API',
      'Ready',
    ];
    const steps = [
      'renderIntroduction',
      'renderCLI',
      'renderPostman',
      'renderSampleAPI',
      'renderTestAPI',
      'renderReady'
    ];
    const fn = this[steps[step]];
    return (
      <App>
        <Helmet title="Ranking"/>
        <div className={'container ' + styles.Tutorial}>
          <PageTitle>Welcome {user && user.username} to RestCoder! </PageTitle>

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
        </div>
      </App>
    );
  }
}
