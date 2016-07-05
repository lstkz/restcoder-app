import React, {PropTypes} from 'react';
import {ExternalLink, BashCode} from '../';

export default class C9Setup extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <h3>c9.io Setup</h3>
        <section>
          Run in terminal:
          <BashCode>{this.props.children}</BashCode>
          <ExternalLink href="https://github.com/restcoder/sh">Check our github repo for complete installation scripts </ExternalLink>
        </section>
        <hr/>
      </div>
    );
  }
}
