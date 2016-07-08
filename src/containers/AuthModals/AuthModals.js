import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {ShortModal} from '../../components';
import {LoginForm, RegisterForm, ForgotPasswordForm, UsernameForm} from '../../components/Auth';
import * as actions from '../../redux/modules/auth';

@connect(state => state.auth, actions)
export default class AuthModals extends React.Component {
  static propTypes = {
    modal: PropTypes.string,
    socialError: PropTypes.string,
    oauthData: PropTypes.object,
    isModalVisible: PropTypes.bool.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired,
    socialAuth: PropTypes.func.isRequired,
  };

  renderContent() {
    const {modal, openModal, socialError, socialAuth} = this.props;
    const commonProps = {
      socialError,
      openModal: openModal,
      socialAuth: socialAuth,
    };
    switch (modal) {
      case 'login':
        return <LoginForm {...commonProps} onSubmit={actions.handleLoginSubmit} />;
      case 'register':
        return <RegisterForm {...commonProps} onSubmit={actions.handleRegisterSubmit} />;
      case 'forgotPassword':
        return <ForgotPasswordForm {...commonProps} onSubmit={actions.handleForgotPasswordSubmit} />;
      case 'username':
        return (<UsernameForm
          {...commonProps}
          onSubmit={(values, dispatch) => actions.handleUsernameSubmit(values, dispatch, this.props.oauthData)} />
        );
      default:
        return null;
    }
  }

  render() {
    const {modal, closeModal, isModalVisible} = this.props;
    let title = '';
    switch (modal) {
      case 'login':
        title = 'Log in to RestCoder';
        break;
      case 'register':
        title = 'Sign up to RestCoder';
        break;
      case 'forgotPassword':
        title = 'Forgot Password?';
        break;
      case 'username':
        title = 'Pick your username';
        break;
      default:
        return null;
    }

    return (
      <ShortModal show={isModalVisible} onHide={closeModal} title={title}>
        {this.renderContent()}
      </ShortModal>
    );
  }
}
