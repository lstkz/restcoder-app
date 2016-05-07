import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import styles from './Profile.scss';
import {asyncConnect} from 'redux-async-connect';
import * as actions from '../../redux/modules/profile';
import {App} from '../';
import {Tabs, Tab} from 'react-bootstrap';
import {ProfileInfo, ProfileStats, ProfileSubmissionHistory} from '../../components';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => dispatch(actions.init(params.username))
}])
@connect(state => state.profile, {})
export default class Profile extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    const {user} = this.props;

    return (
      <App>
        <div>
          <div className="container">

            <div className={styles.Profile}>
              <div className="row">
                <div className="col-xs-4 col-sm-3 col-md-2">
                  <ProfileInfo user={user} />
                </div>

                <div className="col-xs-8 col-sm-9 col-md-10">

                  <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title="Stats">
                      <ProfileStats stats={user.stats} />
                    </Tab>
                    <Tab eventKey={2} title="Submission history">
                      <ProfileSubmissionHistory />
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
