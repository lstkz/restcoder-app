import React from 'react';
import {Link} from 'react-router';

export default class VersionWarning extends React.Component {

  render() {
    return (
      <div className="alert alert-warning">
        <strong>Important</strong><br/>
        You can use only versions that are available RestCoder.<br/>
        See <Link to="/help/platform-information">Platform information</Link>.
      </div>
    );
  }
}
