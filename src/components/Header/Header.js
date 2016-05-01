import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {GlobalSpinner} from '../';
import {connect} from 'react-redux';
import classNames from 'classnames';

@connect(state => ({pathname: state.routing.location.pathname, user: state.auth.user}), {})
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object
  };

  render() {
    const {user, pathname} = this.props;
    const styles = require('./Header.scss');

    return (
      <div className={styles.Header}>
        <nav className="navbar navbar-inverse  navbar-static-top" role="navigation">
          <GlobalSpinner/>
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-03">
                <span className="sr-only">Toggle navigation</span>
              </button>
              <a className="navbar-brand">RestCoder</a>
            </div>
            <div className="collapse navbar-collapse" id="navbar-collapse-03">
              <ul className="nav navbar-nav">
                <li className={classNames({active: pathname === '/home'})}><Link to="/home">Practice</Link></li>
                <li><a >Ranking</a></li>
                <li><a >Help</a></li>
                <li><Link to="/">landing</Link></li>
              </ul>
              {user &&
              <p className="navbar-text navbar-right">Signed in as <a className="navbar-link">Mark Otto</a></p>}
              {!user && <form className="navbar-form navbar-right" action="#" role="search">
                <button className="btn btn-primary btn-wide">LOGIN</button>
                <button className="btn btn-danger btn-wide btn-register">REGISTER</button>
              </form>}
              {user && <form className="navbar-form navbar-right" action="#" role="search">
                <div className="form-group">
                  <div className="input-group">
                    <input className="form-control" id="navbarInput-02" type="search" placeholder="Search"/>
                    <span className="input-group-btn">
                      <button type="submit" className="btn"><span className="fui-search"/></button>
                    </span>
                  </div>
                </div>
              </form>
              }
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
