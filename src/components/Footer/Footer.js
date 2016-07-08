import React, { Component } from 'react';
import {Link} from 'react-router';
import styles from './Footer.scss';
import classNames from 'classnames';

export default class Header extends Component {
  render() {
    return (
      <footer className={classNames('bottom-menu', styles.Footer)}>
        <div className="container">
          <div className="row">
            <div className="col-md-2 col-sm-2">
              <Link to="/" className="bottom-menu-brand">RestCoder</Link>
            </div>
            <div className="col-md-8 col-sm-8">
              <ul className="bottom-menu-list">
                <li><Link to="/home" >Practice</Link></li>
                <li><Link to="/ranking" >Ranking</Link></li>
                <li><Link to="/help" >Help</Link></li>
                <li><Link to="/contact" >Contact</Link></li>
              </ul>
            </div>
            <div className="col-md-2 col-sm-2">
              <ul className="bottom-menu-iconic-list">
                <li><a className="fui-facebook" /></li>
                <li><a className="fui-twitter" /></li>
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
    );
  }
}
