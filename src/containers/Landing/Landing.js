import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import config from '../../config';
import {asyncConnect} from 'redux-async-connect';


@asyncConnect([{
  promise: () => {
    return Promise.resolve();
  }
}])
export default class Landing extends Component {


  render() {
    require('./Landing.scss');
    const myPhotoStyle = {
      backgroundImage: "url('https://www.topcoder.com/i/m/Sky_.jpeg')"
    };
    return (
      <div className="landingPage">
        <Helmet {...config.app.head}/>
        <div className="page-wrapper">
          <header className="header-3">
            <div className="container">
              <nav className="navbar" role="navigation">
                <div className="navbar-header pull-left">
                  <a className="brand" href="#">
                    <img src={require('./icons/Infinity-Loop@2x.png')} width="50" height="50" alt=""/>
                    RestCoder
                  </a>
                </div>

                <form className="navbar-form navbar-right pull-right">
                  <Link className="btn btn-primary" to="/login">SIGN IN</Link>
                </form>

              </nav>
            </div>
            <div className="header-background"></div>
          </header>
          <section className="header-3-sub">
            <div className="background">&nbsp;</div>
            <div className="container">
              <div className="row">
                <div className="col-sm-12 text-center">
                  <h3>RestCoder, Practice technologies.</h3>
                </div>
              </div>
            </div>
          </section>
          <section className="content-11">
            <div className="container">
              <Link className="btn btn-large btn-danger " to="/register">TRY IT NOW</Link>
            </div>
          </section>
          <section className="content-26 bg-clouds">
            <div className="container">
              <div className="row">
                <div className="col-sm-8 col-sm-offset-2">
                  <h3>Become a better backend developer</h3>

                  <p className="lead">We’ve created API challenges that will help you improve your skills.</p>
                </div>
              </div>
              <div className="row features">
                <div className="col-sm-3">
                  <img src={require('./icons/bulb.svg')} alt="" width="100" height="100"/>
                  <h6>Pick challenge</h6>
                  We have more than 50+ challenges to solve.
                </div>
                <div className="col-sm-4 col-sm-offset-1">
                  <img src={require('./icons/pc.svg')} alt="" width="145" height="100"/>
                  <h6>Code</h6>
                  Choose your favorite language and technology.
                  <br/>Build a RESTful API application.
                </div>
                <div className="col-sm-3 col-sm-offset-1">
                  <img src={require('./icons/retina.svg')} alt="" width="100" height="100"/>
                  <h6>Submit</h6>
                  Our tester will automatically verify your solution.
                </div>
              </div>
            </div>
          </section>
          <section className="crew-4 hidden">
            <div className="container">
              <h3>Author</h3>

              <div className="members">
                <div className="member-wrapper">
                  <div className="member block-center">
                    <div className="photo-wrapper">
                      <div className="photo" style={myPhotoStyle}>
                        <img width="140" height="140" src="https://www.topcoder.com/i/m/Sky_.jpeg" alt=""/>
                      </div>
                      <div className="overlay">
                        <a href="http://linkedin.com/in/lsentkiewicz" target="_blank"><span
                          className="fui-linkedin"/></a>
                      </div>
                    </div>
                    <div className="info">
                      <div className="name">Łukasz Sentkiewicz</div>
                      The TopCoder development champion

                      <div className="contacts">
                        <a target="_blank"
                           href="https://www.topcoder.com/members/Sky_">https://www.topcoder.com/members/Sky_</a><br/>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          <footer className="bottom-menu  bottom-menu-inverse">
            <div className="container">
              <div className="row">
                <div className="col-md-2 col-sm-2">
                  <a href="/" className="bottom-menu-brand">RestCoder</a>
                </div>
                <div className="col-md-8 col-sm-8">
                  <ul className="bottom-menu-list">
                    <li><a >Challenges</a></li>
                    <li><a >Ranking</a></li>
                    <li><a >Help</a></li>
                    <li><a >Contact</a></li>
                  </ul>
                </div>
                <div className="col-md-2 col-sm-2">
                  <ul className="bottom-menu-iconic-list">
                    <li><a className="fui-facebook"/></li>
                    <li><a className="fui-twitter"/></li>
                  </ul>
                </div>
              </div>

              <div className="row mth">
                <div className="col-sm-12 text-center">
                  <small>© 2016 RestCoder. All Rights Reserved</small>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
