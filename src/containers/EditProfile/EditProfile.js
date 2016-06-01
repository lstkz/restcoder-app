import React, {PropTypes} from 'react';
import styles from './EditProfile.scss';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {Breadcrumb} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import * as actions from '../../redux/modules/editProfile';
import {handleInfoSubmit} from '../../redux/modules/editProfile';
import {App} from '../';
import {LeftMenu, InfoForm} from '../../components/EditProfile';
import {initialize} from 'redux-form';

@asyncConnect([{
  promise: ({store: {dispatch}}) => dispatch(actions.loadData())
}])
@connect(state => state.editProfile, { ...actions, initialize })
export default class EditProfile extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    const {user} = this.props;

    return (
      <App>
        <div className={styles.EditProfile}>

          <div className="container">
            <Breadcrumb>
              <LinkContainer to="/home">
                <Breadcrumb.Item >
                  Home
                </Breadcrumb.Item>
              </LinkContainer>
              <LinkContainer to={`/profile/${user.username}`}>
                <Breadcrumb.Item >
                  {user.username}
                </Breadcrumb.Item>
              </LinkContainer>
              <Breadcrumb.Item active>
                Edit
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="col-md-2 col-sm-4">
              <LeftMenu user={user} />
            </div>
            <div className="col-md-10 col-sm-8">
              <InfoForm onSubmit={handleInfoSubmit} />
            </div>
          </div>
        </div>
      </App>
    );
  }
}
