import React, {PropTypes} from 'react';
import styles from './Help.scss';
import VersionWarning from './VersionWarning';
import {ExternalLink, BashCode} from '../';

export default class RubySetup extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Getting Started with Ruby</h1>
        <h3>Setup</h3>
        <section>
          Install <ExternalLink href="https://www.ruby-lang.org/en/downloads/">Ruby</ExternalLink>
          <br/>
          Install <ExternalLink href="http://maven.apache.org/download.html">Bundler</ExternalLink>
          <br/>
          Check if ruby is properly installed:
          <br/>
          <BashCode>ruby -v<br/>
            ruby 2.3.1p112 (2016-04-26 revision 54768) [x86_64-darwin15]
          </BashCode>
          <BashCode>bundler -v<br/>
           Bundler version 1.12.5
          </BashCode>
        </section>

        <h3>Define Ruby version</h3>
        <section>
          You can define a target version in Gemfile. <br/>
          Example: Use Ruby 2.3.1
          <pre><code>ruby '2.3.1'</code></pre>
          <VersionWarning/>
          <strong>Hint:</strong> You must specify exact version.
          You can use <ExternalLink href="https://rvm.io/rvm/install">rvm</ExternalLink> to install specific ruby versions.
        </section>
      </div>
    );
  }
}
