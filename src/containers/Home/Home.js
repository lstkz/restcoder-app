import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-async-connect';
import {ChallengeList, Header, RecentSubmissions, Top5, Footer, ChallengeFilter} from '../../components';
import { loadChallenges, loadRecentSubmissions, loadTop5 } from 'redux/modules/challenges';

@asyncConnect([{
  promise: ({store: {dispatch}}) => {
    const promises = [];
    promises.push(dispatch(loadChallenges()));
    promises.push(dispatch(loadRecentSubmissions()));
    promises.push(dispatch(loadTop5()));
    return Promise.all(promises);
  }
}])
@connect(state => state.challenges, {loadTop5})
export default class Home extends Component {
  static propTypes = {
    challenges: PropTypes.object.isRequired,
    top5: PropTypes.object.isRequired,
    recent: PropTypes.object.isRequired,
    loadTop5: PropTypes.func.isRequired
  };

  render() {
    const {challenges, top5, recent} = this.props;

    const styles = require('./Home.scss');
    const filters = [
      {
        name: 'level',
        items: [
          {name: 'Very Easy', count: 5},
          {name: 'Easy', count: 4},
        ]
      },
      {
        name: 'series',
        items: [
          {name: 'Starter', count: 10},
          {name: 'Security', count: 4}
        ]
      },
      {
        name: 'status',
        items: [
          {name: 'Not Solved', count: 10},
          {name: 'Solved', count: 4}
        ]
      }
    ];

    return (
      <div className={styles.Home}>
        <Header/>
        <div className="container">

        <div className="row">
          <div className="col-md-9">
            <h4>List of all practice problems</h4>
            <ChallengeList {...challenges} />
          </div>

          <div className="col-md-3">
            <h4>Filter</h4>
            <ChallengeFilter filters={filters} onChange={() => {}} />
          </div>
        </div>

          <div className="row hidden">
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
        </div>
        </div>
        <Footer/>
      </div>
    );
  }
}
