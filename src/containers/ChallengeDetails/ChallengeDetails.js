import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {asyncConnect} from 'redux-async-connect';
import {SwaggerExplorer, Examples, ChallengeHelp} from '../../components';
import {loadChallenge} from '../../redux/modules/challengeDetails';
import {Tabs, Tab} from 'react-bootstrap';
import {Link} from 'react-router';
import {App} from '../';
import {push} from 'react-router-redux';

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
    this.state = {key: 1};
  }

  handleSelect(key) {
    const {challenge, dispatch} = this.props;
    if (key === 'forum') {
      dispatch(push(challenge.forumTopicUrl));
    } else {
      this.setState({key});
    }
  }

  render() {
    const { challenge } = this.props;

    const styles = require('./ChallengeDetails.scss');
    return (
      <App>
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
                <section>
                  <h5>Checkout code</h5>
                  <div className="row">
                    <div className="col-sm-6">
                      Create new directory (optional)
                      <pre><code><span className="nv">$ </span>mkdir {challenge.slug} && cd $_</code></pre>
                    </div>
                    <div className="col-sm-6">
                      Init template
                      <pre><code><span className="nv">$ </span>restcoder init {challenge.id}</code></pre>
                    </div>
                  </div>

                </section>
              </Tab>

              <Tab eventKey={2} title="Endpoints">
                <SwaggerExplorer challenge={challenge} />
              </Tab>
              <Tab eventKey={3} title="Examples">
                <Examples challenge={challenge} />
              </Tab>
              {/*<Tab eventKey={4} title="Help">
                <ChallengeHelp challenge={challenge} />
              </Tab>*/}

              <Tab eventKey={'forum'} title={<span>Discuss <i className="fa fa-external-link" /></span>} />
            </Tabs>
          </div>
        </div>
      </App>
    );
  }
}
