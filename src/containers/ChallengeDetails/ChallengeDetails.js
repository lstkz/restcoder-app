import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {SwaggerExplorer, Examples, ChallengeHelp} from '../../components';
import {loadChallenge} from '../../redux/modules/challengeDetails';
import {Tabs, Tab} from 'react-bootstrap';
import {Link} from 'react-router';
import {App} from '../';
import {push} from 'react-router-redux';
import Helmet from 'react-helmet';
import Joyride from 'react-joyride';

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

  constructor(props) {
    super(props);
    this.state = {
      key: 1,
      steps: []
    };
  }

  componentDidMount() {
    if (__CLIENT__) {
      setTimeout(() => {
        let joyride = this.refs.joyride;
        const steps = [
          {
            tab: 1,
            position: 'top',
            title: 'Welcome to RestCoder',
            text: `
Welcome to your first challenge!<br/>
The <strong>Overview</strong> section describes the problem to solve.<br/>
Please read it carefully!`,
            selector: '#overview'
          },
//          {
//            tab: 1,
//            position: 'top',
//            title: 'Sample solution',
//            text: `We provide a complete solution for every <strong>Starter</strong> challenge.<br/>
//You can check it here.`,
//            selector: '#solution-link'
//          },
//          {
//            tab: 1,
//            position: 'top',
//            title: 'Notes',
//            text: `Keep it mind all <strong>notes</strong>!<br/>
//All problems contain the <code>READY</code> requirement.<br/> Sometimes there can be more information.
//`,
//            selector: '#notes'
//          },
//          {
//            tab: 1,
//            position: 'top',
//            title: 'Environmental Variables',
//            text: `Your application must get all configuration from the environmental variables.<br/>
//This section contains all required variables that your app must use.<br/>
//<strong>Never hardcode any settings!</strong>
//`,
//            selector: '#env-variables'
//          },
//          {
//            tab: 1,
//            position: 'top',
//            title: 'Checkout code',
//            text: `Just copy commands from this section for the initial setup.<br/>
//RestCoder will create a code template for you.`,
//            selector: '#checkout-code'
//          },
//          {
//            tab: 2,
//            position: 'top',
//            title: 'Endpoints',
//            text: `The <strong>Endpoints</strong> tab contains all required endpoints that your application must implement.`,
//            selector: '#endpoints-tab'
//          },
//          {
//            tab: 2,
//            position: 'top',
//            title: 'Endpoints',
//            text: `This is an endpoint definition.<br/> The <code>Schema</code> describes a required response format.<br/>
//In this endpoint you must return a plain text.`,
//            selector: '#endpoints .operations'
//          },
//          {
//            tab: 2,
//            position: 'top',
//            title: 'Endpoints',
//            text: `In RestCoder almost all responses will be in the JSON format. Always check the <code>Schema</code> carefully.<br/>
//Your application should return exactly the same format.<br/>
//Don't include any additional properties.`,
//            selector: '#endpoints .operations:nth-child(2) .json-schema-view'
//          },
//          {
//            tab: 3,
//            position: 'top',
//            title: 'Examples',
//            text: `The <strong>Examples</strong> tab contains sample requests and response. <br/> Your API should produce the same result.`,
//            selector: '#examples-tab'
//          },
          {
            tab: 3,
            position: 'top',
            title: 'Endpoints',
            text: `This is an example HTTP request.<br/> It contains all information about the request and response.
<br/>Always check the response headers if available.`,
            selector: '#challengeTabs-pane-3 .example'
          },
          {
            tab: 3,
            position: 'top',
            title: 'Endpoints',
            text: `Click this button to quickly import all examples to Postman.`,
            selector: '#postman-btn'
          },
        ];
        this.setState({ steps });
        joyride.start(true)
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

  stepCallback() {
    const progress = this.refs.joyride.getProgress();
    let joyride = this.refs.joyride;
    if (progress.step) {
      if (progress.step.tab && this.state.key !== progress.step.tab) {
        this.setState({ key: progress.step.tab });
      }
      setTimeout(() => joyride.start(true), 300);
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
          stepCallback={::this.stepCallback}
          locale={{
            close: 'OK'
          }}
          type="single"
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


          <div>
            <Tabs activeKey={this.state.key} id="challengeTabs" onSelect={::this.handleSelect}>
              <Tab eventKey={1} title="Details">
                <div dangerouslySetInnerHTML={{__html: challenge.content}}>
                </div>
                <section id="checkout-code">
                  <h5>Checkout code</h5>
                  <div className="row">
                    <div className="col-sm-6">
                      Create a new directory (optional)
                      <pre><code><span className="nv">$ </span>mkdir {challenge.slug} && cd $_</code></pre>
                    </div>
                    <div className="col-sm-6">
                      Init template
                      <pre><code><span className="nv">$ </span>restcoder init {challenge.id}</code></pre>
                    </div>
                  </div>

                </section>
              </Tab>

              <Tab eventKey={2} title={<span id="endpoints-tab" className="">Endpoints</span>}>
                <div id="endpoints">
                  <SwaggerExplorer challenge={challenge}/>
                </div>
              </Tab>
              <Tab eventKey={3} title={<span id="examples-tab" className="">Examples</span>}>
                <Examples challenge={challenge}/>
              </Tab>
              {/*<Tab eventKey={4} title="Help">
               <ChallengeHelp challenge={challenge} />
               </Tab>*/}

              <Tab eventKey={'forum'} title={<span>Discuss <i className="fa fa-external-link" /></span>}/>
            </Tabs>
          </div>
        </div>
      </App>
    );
  }
}
