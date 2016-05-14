import React, { PropTypes } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import styles from './ProfileSubmissionHistory.scss';
import {Link} from 'react-router';

export default class ProfileSubmissionHistory extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired
  };

  render() {
    const {items} = this.props;
    return (
      <div className={styles.ProfileSubmissionHistory}>
        <div className="table-responsive">
          <table className="table table-no-last-padding">
            <colgroup>
              <col width="40px"/>
              <col width="200px"/>
              <col width="300px"/>
            </colgroup>
            <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Problem</th>
              <th>Language</th>
              <th>Result</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item) =>
              <tr key={item.nr} className={classNames('c-white', {
                success: item.result === 'PASS',
                info: item.result === 'PENDING',
                danger: item.result === 'FAIL' || item.result === 'ERROR'
              })}>
                <td>{item.nr}</td>
                <td>{moment(item.createdAt).format('D MMM YYYY H:mm')}</td>
                <td>
                  <Link to={`/challenge/${item.problem.id}`}>{item.problem.name}</Link>
                </td>
                <td>{item.language}</td>
                <td>{item.result}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
