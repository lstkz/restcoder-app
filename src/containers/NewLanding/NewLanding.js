import React, { PropTypes } from 'react';
import styles from './NewLanding.scss';
import {Navbar} from 'react-bootstrap';
import classNames from 'classnames';


export default class NewLanding extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div className={styles.NewLanding}>
        <header>
          <div className="container">

            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <a className="brand" href="#">
                    <img width="220" height="37" src={require('./images/logo.png')} />
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

            {/*<nav className="navbar" role="navigation">
              <div className="navbar-header pull-left">
                <a className="brand" href="#">
                  <img width="220" height="37" src={require('./images/logo.png')} />
                </a>
              </div>
              <form className="navbar-form navbar-right pull-right">
              </form>
            </nav>*/}
          </div>
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
                    <i className={styles.iconAtom} />
                    <span>
                      Create professional applications using <strong>modern technologies</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className={styles.infoItem}>
                    <i className={styles.iconPentagram} />
                    <span>
                      Choose Practice Mode or Competition Mode for <strong>flexibility that suits you</strong>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className={styles.infoItem}>
                    <i className={styles.iconFinger} />
                    <span>
                      <strong>Master integration</strong> with 3rd party database or APIs
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-xs-12">
                  <div className={styles.infoItem}>
                    <i className={styles.iconCode} />
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
      </div>
    );
  }
}
