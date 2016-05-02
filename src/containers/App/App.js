import React, { Component, PropTypes } from 'react';
import {Header, Footer} from '../../components';
import Helmet from 'react-helmet';
import config from '../../config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };


  render() {
    const {children} = this.props;

    return (
      <div>
        <Helmet {...config.app.head}/>
        <Header />
        {children}
        <Footer />
      </div>
    );
  }
}
