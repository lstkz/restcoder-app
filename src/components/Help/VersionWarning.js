import React from 'react';
import {Link} from 'react-router';

export default class VersionWarning extends React.Component {

  render() {
    return (
      <div>
        <h4>Important</h4>
        You can use only versions that are available ResetCoder.<br/>
        See <Link to="/help/platform-information">Platform information</Link>.
      </div>
    );
  }
}
