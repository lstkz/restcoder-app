import React, {PropTypes} from 'react';
import styles from './Help.scss';

export default class RunForeman extends React.Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  render() {
    const {children} = this.props;

    return (
      <div>
        We recommend using <a href="https://github.com/strongloop/node-foreman">node foreman <i
        className="fa fa-external-link"/></a>
          <pre><code>
            {children}
          </code></pre>

        Open <code>{'http://localhost:5000/hello'}</code>
        <br/>
        You should see output: <code>world</code>
      </div>
    );
  }
}
