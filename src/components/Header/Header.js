import React, {Component} from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-inverse  navbar-static-top" role="navigation">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-03">
              <span className="sr-only">Toggle navigation</span>
            </button>
            <a className="navbar-brand">RestCoder</a>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse-03">
            <ul className="nav navbar-nav">
              <li className="active"><a >Challenges</a></li>
              <li><a >Ranking</a></li>
              <li><a >Help</a></li>
              <li><a href="/landing">landing</a></li>
            </ul>
            <p className="navbar-text navbar-right">Signed in as <a className="navbar-link">Mark Otto</a></p>
            <form className="navbar-form navbar-right" action="#" role="search">
              <div className="form-group">
                <div className="input-group">
                  <input className="form-control" id="navbarInput-02" type="search" placeholder="Search"/>
                    <span className="input-group-btn">
                      <button type="submit" className="btn"><span className="fui-search"></span></button>
                    </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}
