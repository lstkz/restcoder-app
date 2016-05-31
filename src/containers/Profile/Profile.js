import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './Profile.scss';
import {asyncConnect} from 'redux-async-connect';
import * as actions from '../../redux/modules/profile';
import {App} from '../';
import {Tabs, Tab} from 'react-bootstrap';
import {Paginate} from '../../components';
import {Stats, Info, SubmissionHistory} from '../../components/Profile';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => dispatch(actions.init(params.username))
}])
@connect(state => state.profile, {...actions})
export default class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    submissions: PropTypes.object.isRequired,
    changeSubmissionsPage: PropTypes.func.isRequired,
  };

  render() {
    const {user, submissions, changeSubmissionsPage} = this.props;

    return (
      <App>
        <div>
          <div className="container">

            <div className={styles.Profile}>
              <div className="row">
                <div className="col-xs-4 col-sm-3 col-md-2">
                  <Info user={user} />
                </div>

                <div className="col-xs-8 col-sm-9 col-md-10">

                  <Tabs defaultActiveKey={1} id="profileTabs">
                    <Tab eventKey={1} title="Stats">
                      <Stats stats={user.stats} />
                    </Tab>
                    <Tab eventKey={2} title="Submission history">
                      <SubmissionHistory items={submissions.items} />
                      {submissions.totalPages > 1 && <Paginate pageNum={submissions.totalPages} clickCallback={(item) => changeSubmissionsPage(item.selected)} />}
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </App>
    );
  }
}
