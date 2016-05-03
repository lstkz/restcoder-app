import React, {Component, PropTypes} from 'react';
import {Header, Footer, ErrorMessage} from '../../components';
import Helmet from 'react-helmet';
import config from '../../config';
import {connect} from 'react-redux';
import * as actions from 'redux/modules/global';

@connect(state => ({ error: state.global.error }), {...actions})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    error: PropTypes.any,
    clearError: PropTypes.func.isRequired
  };


  render() {
    const { children, error, clearError } = this.props;

    return (
      <div>
        <Helmet {...config.app.head}/>
        <Header />
        <ErrorMessage error={error} clearError={clearError} />
        {children}
        <Footer />
      </div>
    );
  }
}
