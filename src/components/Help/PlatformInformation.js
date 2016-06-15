import React, {PropTypes} from 'react';
import styles from './Help.scss';

export default class PlatformInformation extends React.Component {
  static propTypes = {};

  render() {
    return (
      <div className={styles.steps}>
        <h1 className="text-center">Platform Information</h1>
        <h3>Languages</h3>
        <div className="table-responsive">
          <table className="table table-condensed table-striped">
            <colgroup>
              <col width="250px"/>
            </colgroup>
            <thead>
              <tr>
                <th>Language</th>
                <th>Allowed versions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Node.js</td>
                <td>4.4.4, 6.1.0</td>
              </tr>
              <tr>
                <td>Ruby</td>
                <td>2.3.1</td>
              </tr>
              <tr>
                <td>Python</td>
                <td>2.7.11</td>
              </tr>
              <tr>
                <td>Java</td>
                <td>1.8</td>
              </tr>
              <tr>
                <td>.NET (mono)</td>
                <td>4.0.5.1</td>
              </tr>
            </tbody>
          </table>
        </div>
        Please ask on forum if you need any additional version.
        <h3>Services/databases</h3>
        <div className="table-responsive">
          <table className="table table-condensed table-striped">
            <colgroup>
              <col width="250px"/>
            </colgroup>
            <thead>
              <tr>
                <th>Name</th>
                <th>Current version</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>MySQL</td>
                <td>5.7.12</td>
              </tr>
              <tr>
                <td>MongoDB</td>
                <td>3.2.6</td>
              </tr>
              <tr>
                <td>Redis</td>
                <td>3.2.0</td>
              </tr>
              <tr>
                <td>Postgres</td>
                <td>9.5.3</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>Testing environment</h3>
        <div className="table-responsive">
          <table className="table table-condensed table-striped">
            <colgroup>
              <col width="250px"/>
            </colgroup>
            <tbody>
              <tr>
                <td>Operating system</td>
                <td>Debian 7 (wheezy)</td>
              </tr>
              <tr>
                <td>Memory limit per process</td>
                <td>256MB</td>
              </tr>
              <tr>
                <td>Memory limit during dependencies installation</td>
                <td>1GB</td>
              </tr>
              <tr>
                <td>Dependencies installation timeout</td>
                <td>3 min</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
