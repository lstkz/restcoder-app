import React, {PropTypes} from 'react';
import styles from './Profile2.scss';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {App} from '../';
import * as actions from '../../redux/modules/profile';
import {Link} from 'react-router';
import StatsNumber from '../../components/Forum/StatsNumber/StatsNumber';
import {Tabs, Tab} from 'react-bootstrap';
import {Paginate} from '../../components';
import {Stats, SubmissionHistory} from '../../components/Profile';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => dispatch(actions.init(params.username))
}])
@connect(state => state.profile, { ...actions })
export default class Profile2 extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    submissions: PropTypes.object.isRequired,
    changeSubmissionsPage: PropTypes.func.isRequired,
  };

  render() {
    const {user, submissions, changeSubmissionsPage} = this.props;

    return (
      <App>
        <div className={styles.Profile2}>
          <div className="container">
            <ol className="breadcrumb">
              <li>
                <Link to="/home">
                <span>
                  Home
                </span>
                </Link>
              </li>
              <li className="active">
                <span>Test</span>
              </li>
            </ol>

            <div className={styles.avatarWrapper}>
              <div className={styles.avatar} style={{backgroundColor: '#f44336'}}>
                T
              </div>
            </div>

            <div className={`row ${styles.statsRow}`}>
              <h1 className={styles.fullname}>sample user</h1>
              <h1 className={styles.username}>@test</h1>

              <div className={styles.accountStats}>
                <StatsNumber className={styles.statItem} title="Rank" count={1} />
                <StatsNumber className={styles.statItem} title="Score" count={0} />
                <StatsNumber className={styles.statItem} title="Submissions" count={60} />
                <StatsNumber className={styles.statItem} title="Forum posts" count={10} />
              </div>

              <div className={`text-center ${styles.profileMeta}`}>
                <span>Joined</span>
                &nbsp;
                <strong className="timeago" title="Mon May 30 2016 18:33:52 GMT+0200 (CEST)">about 16 hours ago</strong>
              </div>
            </div>
            <hr/>


            <Tabs defaultActiveKey={1} id="profileTabs">
              <Tab eventKey={1} title="Stats">
                <Stats stats={user.stats} />
              </Tab>
              <Tab eventKey={2} title="Submission history">
                <SubmissionHistory items={submissions.items} />
                {submissions.totalPages > 1 && <Paginate pageNum={submissions.totalPages} clickCallback={(item) => changeSubmissionsPage(item.selected)} />}
              </Tab>
              <Tab eventKey={3} title="Forum posts">
              </Tab>
            </Tabs>

          </div>
        </div>
      </App>
    );
  }
}
