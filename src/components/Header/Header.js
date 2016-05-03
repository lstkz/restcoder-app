import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {GlobalSpinner} from '../';
import {connect} from 'react-redux';
import {NavDropdown, MenuItem, Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {logout as logoutAction} from 'redux/modules/auth';

@connect(state => ({user: state.auth.user}), {logout: logoutAction})
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

  render() {
    const {user, logout} = this.props;
    const styles = require('./Header.scss');


    return (
      <div className={styles.Header}>
        <GlobalSpinner/>
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
                <NavDropdown id="user-options" eventKey={3} title={'Signed in as ' + user.username}>
                  <MenuItem eventKey={3.1} href="/profile">My Profile</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.3} onClick={logout}>Logout</MenuItem>
                </NavDropdown>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
