import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {SwaggerExplorer, Examples, ChallengeHelp, ChallengeSetup} from '../../components';
import * as actions from '../../redux/modules/challengeDetails';
import {Tabs, Tab} from 'react-bootstrap';
import {Link} from 'react-router';
import {App} from '../';
import {push} from 'react-router-redux';
import Helmet from 'react-helmet';
import Joyride from 'react-joyride';
import steps1 from './steps1';
import {Solution1} from '../../components/Solutions';

@asyncConnect([{
  promise: ({ params, store: { dispatch } }) => {
    return dispatch(actions.loadChallenge(params.id));
  }
}])
@connect(state => state.challengeDetails, actions)
export default class ChallengeDetails extends Component {
  static propTypes = {
    challenge: PropTypes.object.isRequired,
    autoRunTour: PropTypes.bool.isRequired,
    setAutoRunTour: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      steps: []
    };
  }

  componentWillReceiveProps(props) {
    if (this.challenge !== props.challenge) {
      this.setState({key: 1});
    }
  }

  componentDidMount() {
    if (__CLIENT__) {
      setTimeout(() => {
        const joyride = this.refs.joyride;
        this.setState({ steps: steps1 });
        const {setAutoRunTour, autoRunTour} = this.props;
        if (autoRunTour) {
          joyride.start(true);
          setAutoRunTour(false);
        }
      });
    }
  }

  handleSelect(key) {
    const { challenge, dispatch } = this.props;
    if (key === 'forum') {
      dispatch(push(challenge.forumTopicUrl));
    } else {
      this.setState({ key });
    }
  }

  stepCallback({type, skipped}) {
    if (skipped) {
      return;
    }
    if (type === 'step:after') {
      const joyride = this.refs.joyride;
      const progress = joyride.getProgress();
      if (progress.step) {
        setTimeout(() => {
          if (progress.step.tab && this.state.key !== progress.step.tab) {
            this.setState({ key: progress.step.tab });
          }
          joyride.start(true);
          var scroll = require('scroll');
          scroll.top(joyride._getBrowser() === 'firefox' ? document.documentElement : document.body, joyride._getScrollTop());
        }, 300);
      }
    }
  }

  render() {
    const { challenge } = this.props;

    const styles = require('./ChallengeDetails.scss');
    return (
      <App>
        <Joyride
          ref="joyride"
          steps={this.state.steps}
          scrollToSteps={false}
          callback={::this.stepCallback}
          locale={{
            close: 'OK'
          }}
          showSkipButton
          disableOverlay
          showOverlay/>
        <Helmet title={challenge.name}/>
        <div className={'container ' + styles.ChallengeDetails}>

          <ol className="breadcrumb">
            <li>
              <Link to="/home">
                <span>
                  Practice
                </span>
              </Link>
            </li>
            <li className="active">
              <span>{challenge.name}</span>
            </li>
          </ol>

          <h3>
            {challenge.name}
            <br/>
            <small>id: {challenge.id}</small>
          </h3>


          <div key={challenge.id}>
            <Tabs animation={false} activeKey={this.state.key} id="challengeTabs" onSelect={::this.handleSelect}>
              <Tab eventKey={1} title="Details">
                <div dangerouslySetInnerHTML={{__html: challenge.content}}>
                </div>
              </Tab>
              <Tab eventKey={2} title={<span id="setup-tab">Setup</span>}>
                <ChallengeSetup challenge={challenge}/>
              </Tab>
              <Tab eventKey={3} title={<span id="endpoints-tab">Endpoints</span>}>
                <div id="endpoints">
                  <SwaggerExplorer challenge={challenge}/>
                </div>
              </Tab>
              <Tab eventKey={4} title={<span id="examples-tab">Examples</span>}>
                <Examples challenge={challenge}/>
              </Tab>

              <Tab eventKey={'forum'} title={<span id="discuss-tab">Discuss <i className="fa fa-external-link" /></span>}/>
              {challenge.id === 1 && <Tab eventKey={5} title={<span id="solution-tab">Step by step solution</span>}>
                <Solution1 challenge={challenge} />
              </Tab>}
            </Tabs>
          </div>
        </div>
      </App>
    );
  }
}
