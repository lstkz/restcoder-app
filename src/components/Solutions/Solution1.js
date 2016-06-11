import React, { PropTypes } from 'react';
import _ from 'underscore';
import {Link} from 'react-router';
import {BashCode} from '../';

export default class Solution1 extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
    this.state = {
      step: 'Setup'
    };
  }

  renderMenuItem(text) {
    if (_.isArray(text)) {
      return (
        <ul className="nav nav-list">
          {text.map(::this.renderMenuItem)}
        </ul>
      );
    }
    return (
      <li onClick={() => this.setState({step: text})} className={this.state.step === text ? 'active' : ''}>
        <a>{text}</a>
      </li>
    );
  }
  renderNextBtn(step) {
    return (
      <div className="mtm text-center">
        <a className="btn btn-inverse btn-wide btn-sm" onClick={() => this.setState({step})}>Next</a>
      </div>
    );
  }

  renderSetup() {
    return (
      <div>
        <h4>Setup</h4>
        This guide assumes that you have finished the <Link to="/tutorial">tutorial</Link>. The RestCoder CLI tool and Postman must be installed.
        {this.renderNextBtn('Checkout code')}
      </div>
    );
  }

  renderCheckoutCode() {
    return (
      <div>
        <h4>Checkout</h4>
        Open a terminal and run the following command:<br/>
        <BashCode>restcoder init 1</BashCode>
        You will be asked to choose your target language.
        {this.renderNextBtn('Solve')}
      </div>
    );
  }

  renderSolve() {
    return (
      <div>
        <h4>Solve</h4>
        Open a terminal and run the following command:<br/>
        <BashCode>restcoder init 1</BashCode>
        {this.renderNextBtn('Solve')}
      </div>
    );
  }

  render() {
    const {step} = this.state;
    const menu = [
      'Setup',
      'Checkout code',
      'Solve',
      [
        'Node.js',
        'Ruby',
        'Python',
        'Java',
        '.NET',
      ],
      'Test locally',
      'Submit',
    ];
    const steps = {
      Setup: 'renderSetup',
      'Checkout code': 'renderCheckoutCode',
    };
    const fn = this[steps[step]];

    return (
      <div className="row">
        <div className="col-sm-3">
          <ul className="nav nav-list">
            {menu.map(::this.renderMenuItem)}
          </ul>
        </div>
        <div className="col-sm-9">
          {fn && fn.bind(this)()}
        </div>
      </div>
    );
  }
}
