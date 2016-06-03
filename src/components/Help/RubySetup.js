import React, {PropTypes} from 'react';
import styles from './Help.scss';
import {Link} from 'react-router';
import CheckoutCodeSection from './CheckoutCodeSection';
import SubmitCodeSection from './SubmitCodeSection';
import VersionWarning from './VersionWarning';
import RunForeman from './RunForeman';

export default class RubySetup extends React.Component {
  static propTypes = {};

  renderVersion(version) {
    return <pre><code>{`"engines": { "node": "${version}" }`}</code></pre>;
  }

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting Started with Ruby</h1>
        <h3>Setup</h3>
        <section>
          Install <Link to="/help/cli-tool">RestCoder CLI tool</Link>
        </section>
        <section>
          Install <a target="_blank" href="https://www.ruby-lang.org/en/downloads/">Ruby <i className="fa fa-external-link"/></a>
          <br/>
          Install <a target="_blank" href="http://maven.apache.org/download.html">Bundler <i className="fa fa-external-link"/></a>
          <br/>
          Check if ruby is properly installed:
          <br/>
          <pre><code>
            <span className="nv">$ </span>ruby -v<br/>
            ruby 2.3.1p112 (2016-04-26 revision 54768) [x86_64-darwin15]
          </code></pre>
          <pre><code>
            <span className="nv">$ </span>bundler -v<br/>
           Bundler version 1.12.5
          </code></pre>
        </section>

        <CheckoutCodeSection lang="ruby"/>

        <h3>Define Ruby version</h3>
        <section>
          You can define a target version in Gemfile. <br/>
          Example: Use Ruby 2.3.1
          <pre><code>ruby '2.3.1'</code></pre>
          <VersionWarning/>
          <strong>Hint:</strong> You must specify exact version.
          You can use <a target="_blank" href="https://rvm.io/rvm/install">rvm <i className="fa fa-external-link"/></a> to install specific ruby versions.
        </section>

        <h3>Solve it</h3>
        <section>
          Add following code to <code>app.rb</code>
          <pre><code>
get '/hello' do<br/>
  "world"<br/>
end</code></pre>
          You can find a complete solution <a target="_blank" href="https://github.com/restcoder/Starter-Hello-world">here <i
            className="fa fa-external-link"/></a>
        </section>

        <h3>Running code locally</h3>
        <section>
          Install dependencies from Gemfile
        <pre><code><span className="nv">$ </span>bundler install<br/></code></pre>
          <RunForeman>
            <span className="nv">$ </span>nf start<br/>
            <span className={styles.yellow}>[WARN] No ENV file found</span><br/>
            <span className={styles.success}>[OKAY] Trimming display Output to 243 Columns</span><br/>
            <span className={styles.cyan}>5:15:43 PM web.1 |</span> [2016-06-03 17:15:43] INFO  WEBrick 1.3.1<br/>
            <span className={styles.cyan}>5:15:43 PM web.1 |</span> [2016-06-03 17:15:43] INFO  ruby 2.3.1 (2016-04-26) [x86_64-darwin15]<br/>
            <span className={styles.cyan}>5:15:43 PM web.1 |</span> == Sinatra (v1.4.7) has taken the stage on 5000 for development with backup from WEBrick<br/>
            <span className={styles.cyan}>5:15:43 PM web.1 |</span> [2016-06-03 17:15:43] INFO  WEBrick::HTTPServer#start: pid=79500 port=5000<br/>
            <span className={styles.cyan}>5:15:43 PM web.1 |</span> READY
          </RunForeman>
        </section>
        <SubmitCodeSection lang="ruby@2.3.1" fileCount={3} />
      </div>
    );
  }
}
