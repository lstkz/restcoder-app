import React, {Component, PropTypes} from 'react';
import {Header, Footer, ErrorMessage, FatalError} from '../../components';
import Helmet from 'react-helmet';
import config from '../../config';
import {connect} from 'react-redux';
import * as actions from '../../redux/modules/global';

@connect(state => ({ ...state.global }), {...actions})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    error: PropTypes.any,
    isFatal: PropTypes.bool.isRequired,
    fatalTimestamp: PropTypes.string,
    clearError: PropTypes.func.isRequired
  };


  render() {
    const { children, error, clearError, fatalTimestamp, isFatal } = this.props;

    return (
      <div>
        <Helmet {...config.app.head}/>
        <Header />
        <ErrorMessage error={error} clearError={clearError} />
        <div className="mainContent">
          {isFatal && <FatalError timestamp={fatalTimestamp} />}
          {!isFatal && children}
        </div>
        <Footer />
      </div>
    );
  }
}
