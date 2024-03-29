import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {GlobalSpinner} from '../';
import {connect} from 'react-redux';
import {NavDropdown, MenuItem, Nav, Navbar, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import * as actions from '../../redux/modules/auth';

@connect(state => ({user: state.auth.user, forumUnreadTotal: state.global.forumUnreadTotal}), actions)
export default class Header extends Component {
  static propTypes = {
    user: PropTypes.object,
    forumUnreadTotal: PropTypes.number,
    logout: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  };

  render() {
    const {user, logout, forumUnreadTotal, openModal} = this.props;
    const styles = require('./Header.scss');


    return (
      <div className={styles.Header}>
        <GlobalSpinner/>
        <Navbar staticTop inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/"><img src={require('./logo_white.png')}/></Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/home">
                <NavItem eventKey={1}>Practice</NavItem>
              </LinkContainer>
              <LinkContainer to="/ranking">
                <NavItem eventKey={2}>Ranking</NavItem>
              </LinkContainer>
              <LinkContainer to="/forum">
                <NavItem eventKey={3}>Forum {user && forumUnreadTotal > 0 && <span className="navbar-new">{forumUnreadTotal}</span>}</NavItem>
              </LinkContainer>
              <LinkContainer to="/help">
                <NavItem eventKey={4}>Help</NavItem>
              </LinkContainer>
            </Nav>
            {!user &&
              <Navbar.Form pullRight>
                <button onClick={() => openModal('login')} className="btn btn-primary btn-wide hidden-xs hidden-sm">LOGIN</button>
                <button onClick={() => openModal('login')} className="btn btn-primary hidden-md hidden-lg">LOGIN</button>
                <button onClick={() => openModal('register')} className="btn btn-danger btn-wide btn-register hidden-xs hidden-sm">REGISTER</button>
                <button onClick={() => openModal('register')} className="btn btn-danger btn-register hidden-md hidden-lg">REGISTER</button>
              </Navbar.Form>
            }
            {user &&
              <Nav pullRight>
                <NavDropdown id="user-options" eventKey={3} title={'Signed in as ' + user.username}>
                  <LinkContainer to={`/profile/${user.username}`}>
                    <MenuItem eventKey={3.1}>My Profile</MenuItem>
                  </LinkContainer>
                  <LinkContainer to={`/edit-profile`}>
                    <MenuItem eventKey={3.2}>Edit Profile</MenuItem>
                  </LinkContainer>
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
