import React, {PropTypes} from 'react';
import styles from './Profile.scss';
import {asyncConnect} from 'redux-async-connect';
import {App} from '../';
import {Tabs, Tab} from 'react-bootstrap';

@asyncConnect([{
  promise: ({ store: { dispatch } }) => Promise.resolve()
}])
export default class Profile extends React.Component {
  static propTypes = {};

  render() {
    return (
      <App>
        <div>
          <div className="container">

            <div className={styles.Profile}>
              <div className="row">
                <div className="col-xs-4 col-sm-2 left-panel">
                  <img className="img-responsive" src="https://www.topcoder.com/i/m/Sky_.jpeg" alt=""/>

                  <div className="rank bgm-red">
                    <h2>1</h2>
                    Rank
                  </div>

                  <h5>Country</h5>
                  <h6>Poland</h6>

                  <h5>Joined</h5>
                  <h6>12/31/2015</h6>

                  <h5>Score</h5>
                  <h6>5,790</h6>

                  <h5>Solved problems</h5>
                  <h6>64</h6>

                  <h5>Submissions</h5>
                  <h6>1,799</h6>

                  <a>Edit profile</a>
                </div>

                <div className="col-xs-8 col-sm-10">

                  <Tabs defaultActiveKey={1}>
                    <Tab eventKey={1} title="Stats">

                      <div className="pmb-block language-stats">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="pmbb-header">
                              <h3><i className="fa fa-code"/> Languages</h3>

                            </div>
                            <div className="pmbb-body ">
                              <div className="pmbb-view">
                                <h4 className="m-b-5">Node.js</h4>
                                <small>Level 3 (8/20)</small>
                                <div className="progress">
                                  <div className="progress-bar progress-bar-danger" style={{width: '40%'}}></div>
                                </div>
                              </div>

                              <div className="pmbb-view">
                                <h4 className="m-b-5">Ruby</h4>
                                <small>Level 1 (0/5)</small>
                                <div className="progress">
                                  <div className="progress-bar progress-bar-info" style={{width: '0%'}}></div>
                                </div>
                              </div>

                              <div className="pmbb-view">
                                <h4 className="m-b-5">Python</h4>
                                <small>Level 2 (8/10)</small>
                                <div className="progress">
                                  <div className="progress-bar progress-bar-success" style={{width: '80%'}}></div>
                                </div>
                              </div>

                            </div>
                          </div>
                          <div className="col-md-6">

                            <div className="pmbb-header">
                              <h3><i className="fa fa-cloud"/> Technologies</h3>
                            </div>
                            <div className="pmbb-body ">
                              <div className="pmbb-view">
                                <h5 className="m-b-5">MongoDB</h5>
                                <small>Level 1 (3/5)</small>
                                <div className="progress">
                                  <div className="progress-bar progress-bar-info" style={{width: '60%'}}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                    <Tab eventKey={2} title="Submission history">

                      <div className="table-responsive">
                        <table className="table table-no-last-padding">
                          <thead>
                          <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>Problem</th>
                            <th>Result</th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr className="success c-white">
                            <td>1</td>
                            <td>12/01/2015 11:30</td>
                            <td>Starter: Hello</td>
                            <td>ACCEPTED</td>
                          </tr>
                          <tr className="danger c-white">
                            <td>2</td>
                            <td>13/01/2015 11:30</td>
                            <td>Starter: FizzBuzz</td>
                            <td>FAILED</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </App>
    );
  }
}
