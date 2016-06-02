import React, {PropTypes} from 'react';
import styles from './EditProfile.scss';
import {asyncConnect} from 'redux-async-connect';
import {connect} from 'react-redux';
import {Breadcrumb} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import * as actions from '../../redux/modules/editProfile';
import {handleInfoSubmit, handleEmailChangeSubmit} from '../../redux/modules/editProfile';
import {App} from '../';
import {LeftMenu, InfoForm, EmailForm} from '../../components/EditProfile';
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

  componentWillMount() {
    this.initForms();
  }

  componentWillReceiveProps(props) {
    if (this.props.routeParams.type !== props.routeParams.type) {
      this.initForms();
    }
    this.setState(this.getStateFromProps(props));
  }

  getStateFromProps(props) {
    const {routeParams} = props;
    let tab = 'info';
    if (routeParams.type === 'email' || routeParams.type === 'password') {
      tab = routeParams.type;
    }
    return {tab};
  }

  initForms() {
    this.props.initialize('userInfo', this.props.user, ['fullName', 'quote']);
    this.props.initialize('changeEmail', this.props.user, ['email']);
  }

  renderForm() {
    const {tab} = this.state;
    const {user} = this.props;
    switch (tab) {
      case 'info':
        return (<InfoForm onSubmit={handleInfoSubmit} />);
      case 'email':
        return (
          <EmailForm user={user} onSubmit={handleEmailChangeSubmit} />
        );
      default:
        return null;
    }
  }

  renderBreadcrumbPart() {
    const {tab} = this.state;
    if (tab === 'info') {
      return (
        <Breadcrumb.Item active>
          Edit
        </Breadcrumb.Item>
      );
    }
    return ([
      <LinkContainer key={1} to={`/edit-profile`}>
        <Breadcrumb.Item >
          Edit
        </Breadcrumb.Item>
      </LinkContainer>,
      <Breadcrumb.Item key={2} active>
        Change {tab}
      </Breadcrumb.Item>
    ]);
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
              {this.renderBreadcrumbPart()}
            </Breadcrumb>
            <div className="col-md-2 col-sm-4">
              <LeftMenu
                updatePicture={updatePicture}
                removePicture={removePicture}
                user={user} selectedTab={tab} />
            </div>
            <div className="col-md-10 col-sm-8">
              {this.renderForm()}
            </div>
          </div>
        </div>
      </App>
    );
  }
}
