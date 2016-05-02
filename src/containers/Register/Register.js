import React, { PropTypes } from 'react';
import styles from './Register.scss';
import {App} from '../';

export default class Register extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <App>
        <div className={'container ' + styles.Register}>
          <div className="row">
            <div className="col-md-offset-2 col-md-6">
              {/*<LoginForm onSubmit={this.handleSubmit}/>*/}
            </div>
          </div>
        </div>
      </App>
    );
  }
}
