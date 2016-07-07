import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import config from '../../config';
import {asyncConnect} from 'redux-async-connect';
import styles from './NewLanding.scss';
import {Navbar} from 'react-bootstrap';
import classNames from 'classnames';
import {Footer, LoginModal} from '../../components';
import $ from 'jquery';

@asyncConnect([{
  promise: () => {
    return Promise.resolve();
  }
}])
export default class NewLanding extends React.Component {
  static propTypes = {};

  componentWillMount() {
    if (__CLIENT__) {
      $('html').addClass('html-landing');
    }
  }

  componentWillUnmount() {
    if (__CLIENT__) {
      $('html').removeClass('html-landing');
    }
  }

  render() {
    return (
      <div className={styles.NewLanding}>
        <Helmet {...config.app.head} title="RestCoder" titleTemplate="%s" />
          <LoginModal />
          <header>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a className="brand" href="#">
                    <img width="220" height="37" src={require('./images/logo.png')}/>
                  </a>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Navbar.Form pullRight>
                  <a className="btn btn-lg btn-link mrl" href="/login">Log In</a>
                  <a className={`btn btn-lg btn-link ${styles.tryItNow}`} href="/login">Try it now</a>
                </Navbar.Form>

              </Navbar.Collapse>
            </Navbar>
          </header>
        <section className={styles.cover}>
          <h1>Looking for the best way to practice coding?</h1>
          <h2>
            The best way to learn, is to do.<br/>
            And the best way to practice coding is to code!
          </h2>
          <div className="mth">
            <a className={classNames(styles.socialBtn, styles.socialBtnFB)}>
              <i className="fa fa-facebook"/>
              <span>Start with Facebook</span>
            </a>
            <a className={classNames(styles.socialBtn, styles.socialBtnG)}>
              <i className="fa fa-google-plus"/>
              <span>Start with Google</span>
            </a>
            <a className={classNames(styles.socialBtn, styles.socialBtnGH)}>
              <i className="fa fa-github"/>
              <span>Start with Github</span>
            </a>
          </div>
        </section>

        <section className={styles.platform}>
          <div className="container text-center">
            <div className="row">
              <div className="col-xs-12 col-lg-8 col-lg-offset-2">
                <p>
                  RestCoder is a free educational platform that helps software and backend developers solve real problems from real jobs
                </p>
              </div>
            </div>
            <button className="btn btn-lg btn-primary">Try it now</button>
          </div>
        </section>

        <section className={styles.info}>
          <div className="container ">
            <div className="row">
              <div className="col-xs-12">
                <p>
                  Using RestCoder you can practice creating web<br/>
                  applications, learn programming languages,<br/>
                  and refine your developing skills.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.macWrapper}>
            <div className={classNames('container', styles.infoList)}>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className={styles.infoItem}>
                    <i className={styles.iconAtom}/>
                    <span>
                      Create professional applications using <strong>modern technologies</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className={styles.infoItem}>
                    <i className={styles.iconPentagram}/>
                    <span>
                      Choose Practice Mode or Competition Mode for <strong>flexibility that suits you</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className={styles.infoItem}>
                    <i className={styles.iconFinger}/>
                    <span>
                      <strong>Master integration</strong> with 3rd party database or APIs
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className={styles.infoItem}>
                    <i className={styles.iconCode}/>
                    <span>
                      RestCoder automatically <strong>verifies your solutions</strong> to help your learn
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className={styles.infoItem}>
                    <button className="btn btn-lg btn-primary">Try it now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.become}>
          <div className="container">
            <h1>Become a better backend developer!</h1>
            <h2>Our API challenges improve your skills</h2>
            <div className="row">
              <div className="col-md-4">
                <i className={styles.iconChallenge}/>
                <h3>Pick a challenge</h3>
                <p>
                  Sharpen your skills, with >10 challenges to solve and more on the way.

                </p>
              </div>
              <div className="col-md-4 col-md-offset-0">
                <i className={styles.iconKeyboard}/>
                <h3>Code</h3>
                <p>
                  Choose your favorite language and technology. Build a RESTful API application.
                </p>
              </div>
              <div className="col-md-4 col-md-offset-0">
                <i className={styles.iconSubmit}/>
                <h3>Submit</h3>
                <p>
                  Our tester automatically verifies your solutions to help you learn!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.familiar}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <p>
                  If you are familiar with competitive programming, but are into software development rather than algorithms, RestCoder is the platform you have been waiting for.
                </p>
              </div>
              <div className="col-sm-4 col-sm-offset-2 col-xs-6 col-xs-offset-3">
                <i className={styles.iconHipster}/>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.tech}>
          <div className={styles.techRowWrapper}>
            <div className="container">
              <div className={classNames('row', styles.techRow)}>
                <div className="col-md-3">
                  <h3>Powered by:</h3>
                </div>
                <div className="col-md-9">
                  <div className={styles.techInnerRow}>
                    <i className={styles.iconC9}/>
                    <i className={styles.iconPostman}/>
                    <i className={styles.iconDocker}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.techRowWrapper}>
            <div className="container">
              <div className={classNames('row', styles.techRow)}>
                <div className="col-md-3 col-sm-12">
                  <h3>Languages:</h3>
                </div>
                <div className="col-md-9 col-sm-12">
                  <div className={styles.techInnerRow}>
                    <div className={styles.lang}>
                      <i className={styles.iconJs}/>
                      <span>nodejs</span>
                    </div>
                    <div className={styles.lang}>
                      <i className={styles.iconRuby}/>
                      <span>ruby</span>
                    </div>
                    <div className={styles.lang}>
                      <i className={styles.iconPython}/>
                      <span>python</span>
                    </div>
                    <div className={styles.lang}>
                      <i className={styles.iconJava}/>
                      <span>java</span>
                    </div>
                    <div className={styles.lang}>
                      <i className={styles.iconDotnet}/>
                      <span>.net</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.techRowWrapper}>
            <div className="container">
              <div className={classNames('row', styles.techRow)}>
                <div className="col-md-3">
                  <h3>Coming soon:</h3>
                </div>
                <div className="col-md-9">
                  <div className={styles.techInnerRow}>
                    <div className={styles.lang}>
                      <i className={styles.iconPhp}/>
                      <span>php</span>
                    </div>
                    <div className={styles.lang}>
                      <i className={styles.iconGo}/>
                      <span>go</span>
                    </div>
                    <div className={styles.lang}>
                      <i className={styles.iconClojure}/>
                      <span>clojure</span>
                    </div>
                    <div className={styles.lang}>
                      <i className={styles.iconScala}/>
                      <span>scala</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className={styles.author}>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-xs-12 col-lg-8">
                <p>
                  Benefit from practical exercises that really help you understand - created by a two-times winner of the TopCoder Open development tournament.
                </p>
                <p>
                  Learn from the best!
                </p>
                <p>
                  <strong>Łukasz Sentkiewicz, <a target="_blank" href="https://www.topcoder.com/members/Sky_/">@Sky_</a></strong>
                </p>
              </div>
              <div className="col-lg-3 col-lg-offset-1 col-sm-4 col-sm-offset-2 col-xs-6 col-xs-offset-3">
                <i className={styles.iconSky}/>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.joinNow}>
          <div className="container text-center">
            <button className="btn btn-lg btn-primary">Join now</button>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}
