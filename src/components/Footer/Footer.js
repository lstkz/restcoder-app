import React, { Component } from 'react';
import styles from './Footer.scss';
import classNames from 'classnames';

export default class Header extends Component {
  render() {
    return (
      <footer className={classNames('bottom-menu', styles.Footer)}>
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
