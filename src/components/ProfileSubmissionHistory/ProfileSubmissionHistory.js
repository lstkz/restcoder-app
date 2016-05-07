import React, { PropTypes } from 'react';
import styles from './ProfileSubmissionHistory.scss';

export default class ProfileSubmissionHistory extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div className={styles.ProfileSubmissionHistory}>
        <div className="table-responsive">
          <table className="table table-no-last-padding">
            <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Problem</th>
              <th>Result</th>
            </tr>
            </thead>
            <tbody>
            <tr className="success c-white">
              <td>1</td>
              <td>12/01/2015 11:30</td>
              <td>Starter: Hello</td>
              <td>PASS</td>
            </tr>
            <tr className="danger c-white">
              <td>2</td>
              <td>13/01/2015 11:30</td>
              <td>Starter: FizzBuzz</td>
              <td>FAILED</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
