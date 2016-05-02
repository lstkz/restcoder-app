import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import _ from 'underscore';
import {ChallengeList, RecentSubmissions, Top5, ChallengeFilter, ActivationLinkInfo} from '../../components';
import * as actions from 'redux/modules/challenges';
import {App} from '../';


@asyncConnect([{
  promise: ({ store: { dispatch } }) => {
    const promises = [];
    promises.push(dispatch(actions.loadChallenges()));
//    promises.push(dispatch(loadRecentSubmissions()));
//    promises.push(dispatch(loadTop5()));
    return Promise.all(promises);
  }
}])
@connect(state => ({ ...state.challenges, ..._.pick(state.auth, 'isLoggedIn', 'confirmEmailVisible', 'confirmEmailTarget') }), { ...actions })
export default class Home extends Component {
  static propTypes = {
    challenges: PropTypes.object.isRequired,
    top5: PropTypes.object.isRequired,
    recent: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    loadTop5: PropTypes.func.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    confirmEmailVisible: PropTypes.bool.isRequired,
    confirmEmailTarget: PropTypes.string
  };

  render() {
    const { challenges, top5, recent, toggleFilter, isLoggedIn, filter, confirmEmailVisible, confirmEmailTarget } = this.props;
    let { filters } = this.props;
    const styles = require('./Home.scss');

    if (!isLoggedIn) {
      filters = filters.slice(0, filters.length - 1);
    }

    return (
      <App>
        <ActivationLinkInfo visible={confirmEmailVisible} email={confirmEmailTarget} />
        <div className={'container ' + styles.Home}>
          <div className="row">
            <div className="col-md-9">
              <h4>List of all practice problems</h4>
              <ChallengeList {...challenges} isLoggedIn={isLoggedIn}/>
            </div>

            <div className="col-md-3">
              <h4>Filter</h4>
              <ChallengeFilter isLoggedIn={isLoggedIn} filters={filters} toggleFilter={toggleFilter} filter={filter}/>
            </div>
          </div>

          {false && <div className="row hidden">
            <div className="col-md-3">
              <div className="row">
                <div className="col-md-12 col-sm-6">
                  <RecentSubmissions {...recent} />
                </div>
                <div className="col-md-12 col-sm-6">
                  <Top5 loadTop5={this.props.loadTop5} {...top5} />
                </div>
              </div>
            </div>
          </div>}
        </div>
      </App>
    );
  }
}
