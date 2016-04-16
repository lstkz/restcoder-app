import React, { Component } from 'react';
import {ChallengeList, Header, RecentSubmissions, Top5} from '../../components';

export default class Home extends Component {

  render() {
    return (
      <div>
        <Header/>
        <div className="container">

          <div className="col-md-9">
            <h4>Challenges</h4>
            <div className="row">
              <div className="col-md-11">
                <ChallengeList/>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <RecentSubmissions/>
            <Top5/>

          </div>
        </div>
      </div>
    );
  }
}
