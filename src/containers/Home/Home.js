import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import _ from 'underscore';
import {ChallengeList, ChallengeFilter, HeaderMessage} from '../../components';
import * as actions from '../../redux/modules/challenges';
import {App} from '../';
import Helmet from 'react-helmet';


@asyncConnect([{
  promise: ({ store: { dispatch } }) => dispatch(actions.init())
}])
@connect(state => ({ ...state.challenges, ..._.pick(state.auth, 'isLoggedIn', 'confirmEmailVisible', 'confirmEmailTarget', 'infoMessage') }), { ...actions })
export default class Home extends Component {
  static propTypes = {
    challenges: PropTypes.object.isRequired,
    filter: PropTypes.object.isRequired,
    filters: PropTypes.array.isRequired,
    toggleFilter: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    confirmEmailVisible: PropTypes.bool.isRequired,
    confirmEmailTarget: PropTypes.string
  };

  render() {
    const { challenges, toggleFilter, isLoggedIn, filter, confirmEmailVisible, confirmEmailTarget, infoMessage } = this.props;
    let { filters } = this.props;
    const styles = require('./Home.scss');

    if (!isLoggedIn) {
      filters = filters.slice(0, filters.length - 1);
    }

    return (
      <App>
        <Helmet title="Practice" />
        {confirmEmailVisible && <HeaderMessage>
          Activation link was sent to <span className="text-primary">{confirmEmailTarget}</span>
        </HeaderMessage>}
        {infoMessage && <HeaderMessage>{infoMessage}</HeaderMessage>}
        <div className={'container ' + styles.Home}>
          <div className="row">
            <div className="col-md-9 col-sm-9">
              <h4>List of all practice problems</h4>
              <ChallengeList {...challenges} isLoggedIn={isLoggedIn}/>
            </div>

            <div className="col-md-3 col-sm-3">
              <h4>Filter</h4>
              <ChallengeFilter isLoggedIn={isLoggedIn} filters={filters} toggleFilter={toggleFilter} filter={filter}/>
            </div>
          </div>

          {/* <div className="row hidden">
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
          </div>*/}
        </div>
      </App>
    );
  }
}
