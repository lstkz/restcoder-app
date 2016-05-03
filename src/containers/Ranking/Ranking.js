import React, { PropTypes } from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {}
import styles from './Ranking.scss';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [];
    return Promise.all(promises);
  }
}])
@connect(state => ({ ...state.challenges, ..._.pick(state.auth, 'isLoggedIn', 'confirmEmailVisible', 'confirmEmailTarget') }), { ...actions })
export default class Ranking extends React.Component {
  static propTypes = {

  };

  render() {
    return (
      <div className={styles.Ranking}>
      </div>
    );
  }
}
