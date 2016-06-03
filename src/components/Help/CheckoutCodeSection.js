import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class CheckoutCodeSection extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
  };

  render() {
    const {lang} = this.props;

    return (
      <div>
        <h3>Checkout code</h3>
        <section>
          In this example we will be solving <Link to="/challenge/1">Starter: Hello world</Link>. <br/>
          Create an empty directory.<br/>
          <pre><code>
            <span className="nv">$ </span>mkdir {lang}-hello-world<br/>
            <span className="nv">$ </span>cd {lang}-hello-world<br/>
          </code></pre>
          Prepare a code template.
          <pre><code>
            <span className="nv">$ </span>restcoder init 1<br/>
          </code></pre>
          <small>
            NOTE: Parameter <code>1</code> is the problem id. You can get this parameter from the <strong>Checkout code</strong> section in the problem statement.
          </small>
        </section>
      </div>
    );
  }
}
