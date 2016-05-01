import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {GlobalSpinner} from '../';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {NavDropdown, MenuItem, Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

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
        <Navbar staticTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a>RestCoder</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/home">
                <NavItem eventKey={1}>Practice</NavItem>
              </LinkContainer>
              <NavItem eventKey={2} href="#">Ranking</NavItem>
              <NavItem eventKey={2} href="#">Help</NavItem>
            </Nav>
            {!user &&
              <Navbar.Form pullRight>
                <Link to="/login" >
                  <button className="btn btn-primary btn-wide hidden-xs hidden-sm">LOGIN</button>
                  <button className="btn btn-primary hidden-md hidden-lg">LOGIN</button>
                </Link>
                <Link to="/register" >
                  <button className="btn btn-danger btn-wide btn-register hidden-xs hidden-sm">REGISTER</button>
                  <button className="btn btn-danger btn-register hidden-md hidden-lg">REGISTER</button>
                </Link>
              </Navbar.Form>
            }
            {user &&
              <Nav pullRight>
                <NavDropdown eventKey={3} title={'Signed in as ' + user.username}>
                  <MenuItem eventKey={3.1} href="/profile">My Profile</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3} href="/logout">Logout</MenuItem>
                </NavDropdown>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );


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
              {!user && <form className="navbar-form navbar-right" action="#" role="search">
                <Link to="/login" ><button className="btn btn-primary btn-wide">LOGIN</button></Link>
                <button className="btn btn-danger btn-wide btn-register">REGISTER</button>
              </form>}
              {user &&
              <p className="navbar-text navbar-right">Signed in as <a className="navbar-link">{user.username}</a></p>}
              {user &&

              <Nav>
                <NavDropdown title={'Signed in as ' + user.username} id="nav-dropdown">
                  <MenuItem eventKey="1">Profile</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey="2">Logout</MenuItem>
                </NavDropdown>
              </Nav>
              }

              {user && <form className="navbar-form navbar-right hidden" action="#" role="search">
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
