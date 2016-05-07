import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {SwaggerExplorer, Examples, ChallengeHelp} from '../../components';
import {loadChallenge} from '../../redux/modules/challengeDetails';
import {Tabs, Tab} from 'react-bootstrap';
import {App} from '../';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => {
    return dispatch(loadChallenge(params.id));
  }
}])
@connect(state => state.challengeDetails, {})
export default class ChallengeDetails extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired
  };

  render() {
    const { challenge } = this.props;
    console.log(challenge);

    const styles = require('./ChallengeDetails.scss');
    return (
      <App>
        <div className={'container ' + styles.ChallengeDetails}>
          <h3>
            {challenge.name}
            <br/>
            <small>id: {challenge.id}</small>
          </h3>


          <div>
            <Tabs defaultActiveKey={1}>
              <Tab eventKey={1} title="Details">
                <div dangerouslySetInnerHTML={{__html: challenge.content}}>
                </div>
              </Tab>

              <Tab eventKey={2} title="Endpoints">
                <SwaggerExplorer challenge={challenge} />
              </Tab>
              <Tab eventKey={3} title="Examples">
                <Examples challenge={challenge} />
              </Tab>
              <Tab eventKey={4} title="Help">
                <ChallengeHelp challenge={challenge} />
              </Tab>
            </Tabs>
          </div>
        </div>
      </App>
    );
  }
}
