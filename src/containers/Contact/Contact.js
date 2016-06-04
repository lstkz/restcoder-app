import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import styles from './Contact.scss';
import {ContactForm, PageTitle} from '../../components';
import {handleContactSubmit} from '../../redux/modules/auth';
import {App} from '../';

@asyncConnect([{
  promise: () => Promise.resolve()
}])
@connect((state) => state )
export default class Contact extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  render() {
    const {auth: {isLoggedIn}} = this.props;
    return (
      <App>
        <div className={'container ' + styles.Contact}>
          <PageTitle>Contact</PageTitle>
          <div className="row">
            <div className="col-md-offset-2 col-md-6">
              <ContactForm isEmailRequired={!isLoggedIn} onSubmit={handleContactSubmit}/>
            </div>
          </div>
        </div>
      </App>
    );
  }
}
