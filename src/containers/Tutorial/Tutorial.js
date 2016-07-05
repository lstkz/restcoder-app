import React, {PropTypes} from 'react';
import styles from './Tutorial.scss';
import {App} from '../';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import * as actions from '../../redux/modules/challengeDetails';
import {PageTitle, ExternalLink, BashCode} from '../../components';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import _ from 'underscore';

@asyncConnect([{
  promise: () => Promise.resolve()
}])
@connect(state => state, actions)
export default class Tutorial extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      tab: 'renderIntroduction'
    };
  }

  renderNextBtn(tab) {
    return (
      <a className="btn btn-inverse btn-wide" onClick={() => this.setState({tab})}>Next</a>
    );
  }

  renderNextBtnWithProblem(tab) {
    return (
      <div>
        <div className="text-center">
          {this.renderNextBtn(tab)}
        </div>
        <div className="text-center">
          <small><Link to="/category/4/comments-feedback" target="_blank"> (Problems? Report it here)</Link></small>
        </div>
      </div>
    );
  }


  renderIntroduction() {
    return (
      <div>
        <h3 className="text-center">Introduction</h3>
        <section>
          Welcome to the first online judge for software developers!<br/>
          Before you can solve any practice challenges you must setup required tools.<br/>
          It shouldn't take more than 5 minutes!<br/>
        </section>
        <h4 className="text-center">Do you prefer a local environment or <a href="http://c9.io">c9.io</a>?</h4>
        <div className="text-center mtl">
          <div className="col-xs-3 col-xs-offset-3">
            <a className="btn btn-inverse btn-wide" onClick={() => this.setState({tab: 'renderCLI'})}>Local</a>
          </div>
          <div className="col-xs-3">
            <a className="btn btn-inverse btn-wide" onClick={() => this.setState({tab: 'renderSetupC9'})}>c9.io</a>
          </div>
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
          Log in with your account.<br/>
          Use your username and password from RestCoder.<br/>
          <BashCode>restcoder login<br/>
            <span className="c-gray">Your username:</span> myUsername<br/>
            <span className="c-gray">Your password:</span> <br/>
            Authenticated successfully</BashCode>
        </section>
        {this.renderNextBtnWithProblem('renderLocalPostman')}
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


  renderPostman(next) {
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
            {this.renderNextBtn(next)}
          </div>
        </section>
      </div>
    );
  }
  renderLocalPostman() {
    return this.renderPostman('renderSampleAPI');
  }
  renderC9Postman() {
    return this.renderPostman();
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
          Just run the command:
          <BashCode>restcoder start</BashCode>

          <div className={styles.consoleImg}>
            <img width="666" height="270" src="https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/tutorial/tutorial.gif"/>
          </div>

        </section>
        {this.renderNextBtnWithProblem('renderTestAPI')}
      </div>
    );
  }

  renderC9SampleAPI() {
    return (
      <div>
        <h3 className="text-center">Run a sample API</h3>
        <section>
          Sample API has only one route: <code>GET /test</code><br/>

          Open your terminal and type:<br/>
          <BashCode>restcoder tutorial ./</BashCode>
          It will create a sample nodejs app in current directory.<br/>

          The CLI can start your application automatically (don't use <strong>Run</strong> button in c9).<br/>
          Just run the command:
          <BashCode>restcoder start</BashCode>

          Copy your application URL. It will be needed in the next step!

          <div className={styles.consoleC9Img + ' mtm'}>
            <img width="810" height="272" src="https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/tutorial/c9-tutorial.gif"/>
          </div>

        </section>
        {this.renderNextBtnWithProblem('renderC9TestAPI')}
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
        {this.renderNextBtnWithProblem('renderReady')}
      </div>
    );
  }

  renderC9TestAPI() {
    return (
      <div>
        <h3 className="text-center">Test a sample API</h3>
        <section>
          Every API application must be tested in some way.<br/>

          You can just open <a href="http://project-restcoder.c9users.io/test" target="_blank">http://project-restcoder.c9users.io/test</a> in your browser and see the output. <br/>
          However such format is not user friendly.<br/>

          Open postman and test above URL.<br/>

          <div className="alert alert-warning" role="alert">
            <strong>Warning!</strong> Use the URL from the previous step instead of <code>http://project-restcoder.c9users.io</code>
          </div>
          <div className="text-center mvm">
            <img className="img-responsive"
                 width="706"
                 height="513"
                 src="https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/tutorial/c9-postman.gif"/>
          </div>

          <hr/>

          <div className="alert alert-danger" role="alert">
            <strong>Invalid response?</strong><br/>
            Make your Application public in c9. Click <strong>Share</strong> in the right-upper corner.
          </div>
          <div className="text-center mvm">
            <img className="img-responsive"
                 width="560"
                 height="208"
                 src="https://s3-eu-west-1.amazonaws.com/restcoder-prod/assets/tutorial/c9-public.png"/>
          </div>
        </section>
        {this.renderNextBtnWithProblem('renderReady')}
      </div>
    );
  }

  renderSetupC9() {
    return (
      <div>
        <h3 className="text-center">Setup c9.io</h3>
        <section>
          Setup is pretty straightforward.
          <ul>
            <li>Create a free account at <a target="_blank">c9.io</a></li>
            <li>Create a new workspace and choose a blank template</li>
            <li>Execute below command in terminal <br/>
              <BashCode>{"source <(curl -s https://raw.githubusercontent.com/restcoder/sh/master/c9-install.sh)"}</BashCode>
            </li>
            <li>
              Log in with your account.<br/>
              Use your username and password from RestCoder.<br/>
              <BashCode>restcoder login<br/>
                <span className="c-gray">Your username:</span> myUsername<br/>
                <span className="c-gray">Your password:</span> <br/>
                Authenticated successfully</BashCode>
            </li>
          </ul>


          <div className="text-center mvl">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/R94n0nTwaHA" frameBorder="0"
                    allowFullScreen></iframe>
          </div>
        </section>
        {this.renderNextBtnWithProblem('renderC9Postman')}
      </div>
    );
  }

  renderMenuItem(text, tab) {
    return (
      <li onClick={() => this.setState({tab})} className={this.state.tab === tab ? 'active' : ''}>
        <a>{text}</a>
      </li>
    );
  }

  render() {
    const { tab } = this.state;
    const { auth: { user } } = this.props;
    const fn = this[tab];
    return (
      <App>
        <Helmet title="Ranking"/>
        <div className={'container ' + styles.Tutorial}>
          <PageTitle>Welcome {user && user.username} to RestCoder! </PageTitle>

          <div className="row">
            <div className="col-sm-3">
              <ul className="nav nav-list">
                {this.renderMenuItem('Introduction', 'renderIntroduction')}
                <li className="nav-header">Local</li>
                <li>
                  <ul className="nav nav-list">
                    {this.renderMenuItem('RestCoder CLI', 'renderCLI')}
                    {this.renderMenuItem('Install Postman', 'renderLocalPostman')}
                    {this.renderMenuItem('Run a sample API', 'renderSampleAPI')}
                    {this.renderMenuItem('Test a sample API', 'renderTestAPI')}
                  </ul>
                </li>
                <li className="nav-header">c9.io</li>
                <li>
                  <ul className="nav nav-list">
                    {this.renderMenuItem('Setup c9', 'renderSetupC9')}
                    {this.renderMenuItem('Install Postman', 'renderC9Postman')}
                    {this.renderMenuItem('Run a sample API', 'renderC9SampleAPI')}
                    {this.renderMenuItem('Test a sample API', 'renderC9TestAPI')}
                  </ul>
                </li>
                {this.renderMenuItem('Ready', 'renderReady')}
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
