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
  promise: ({store: {dispatch}}) => {
    dispatch(actions.loadData());
    return Promise.resolve();
  }
}])
@connect(state => state.editProfile, { ...actions, initialize })
export default class EditProfile extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    initialize: PropTypes.func.isRequired,
    updatePicture: PropTypes.func.isRequired,
    removePicture: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = this.getStateFromProps(props);
  }

  getStateFromProps(props) {
    const {routeParams} = props;
    let tab = 'info';
    if (routeParams.type === 'email' || routeParams.type === 'password') {
      tab = routeParams.type;
    }
    return {tab};
  }

  componentWillReceiveProps(props) {
    this.setState(this.getStateFromProps(props));
  }

  componentWillMount() {
    this.props.initialize('userInfo', this.props.user, ['fullName', 'quote']);
  }

  render() {
    const {user, updatePicture, removePicture} = this.props;
    const {tab} = this.state;

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
              <LeftMenu
                updatePicture={updatePicture}
                removePicture={removePicture}
                user={user} selectedTab={tab} />
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
